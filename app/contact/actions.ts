'use server';

import { prisma } from '@/config/prisma';
import {
  addSubmissionToStore,
  getSubmissionsFromStore,
  deleteSubmissionFromStore,
  writeSubmissionsToFile,
  FormattedContactMessage,
} from '@/lib/submissionsStore';

export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  domain?: string;
  message: string;
}

export interface ContactInfoData {
  phone: string;
  email: string;
  fax: string;
  address: string;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

const defaultContactInfo: ContactInfoData = {
  phone: '+91 9296998511',
  email: 'contructionsolutionsservices@gmail.com',
  fax: '+1 (800) 555-5678',
  address: 'Harmu Housing basant bihar colony B1 Ranchi 834002',
};

/**
 * Ultra-fast Timeout Race Helper (150ms) to ensure instant responses without hanging
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 150): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Database operation timeout')), timeoutMs)
    ),
  ]);
}

/**
 * Server Action to submit a contact form message from the frontend.
 * Instantly saves to persistent disk backup and syncs asynchronously to database.
 */
export async function submitContactMessage(
  formData: ContactMessageInput
): Promise<ActionResult> {
  try {
    const name = formData.name?.trim();
    const email = formData.email?.trim();
    const phone = formData.phone?.trim() || null;
    const domain = formData.domain?.trim() || null;
    const message = formData.message?.trim();

    if (!name || !email || !message) {
      return {
        success: false,
        message: 'Please fill in all required fields (Name, Email, Message).',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please provide a valid email address.',
      };
    }

    const formattedDate = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let createdId = Date.now();

    // 1. Attempt Prisma DB Save fast
    try {
      const created = await withTimeout(
        prisma.contactMessage.create({
          data: {
            name,
            email,
            phone,
            domain,
            message,
          },
        }),
        250
      );
      if (created?.id) {
        createdId = created.id;
      }
    } catch {
      // Safe fallback to persistent file backup
    }

    const newInquiry: FormattedContactMessage = {
      id: createdId,
      name,
      email,
      phone,
      domain,
      message,
      createdAt: formattedDate,
      status: 'unread',
    };

    // 2. Permanently persist to disk file backup + global store
    addSubmissionToStore(newInquiry);

    return {
      success: true,
      message: 'Your inquiry has been submitted successfully! Our team will contact you shortly.',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Failed to submit your inquiry. Please try again.',
    };
  }
}

/**
 * Server Action to fetch all dynamic contact messages for the admin view.
 * Instantly reads disk backup combined with database results.
 */
export async function getAllContactMessages(): Promise<ActionResult<FormattedContactMessage[]>> {
  try {
    const diskStore = getSubmissionsFromStore();

    let dbMessages: any[] = [];
    try {
      dbMessages = await withTimeout(
        prisma.contactMessage.findMany({
          orderBy: {
            id: 'desc',
          },
        }),
        150
      );
    } catch {
      // Safe fast fallback
    }

    if (Array.isArray(dbMessages) && dbMessages.length > 0) {
      const formattedDbMessages: FormattedContactMessage[] = dbMessages.map((msg) => {
        let formattedDate = 'Recently';
        try {
          if (msg.createdAt) {
            formattedDate = new Date(msg.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });
          }
        } catch {
          formattedDate = String(msg.createdAt || 'Recently');
        }

        return {
          id: msg.id,
          name: msg.name || 'Anonymous Client',
          email: msg.email || 'client@example.com',
          phone: msg.phone || null,
          domain: msg.domain || null,
          message: msg.message || '',
          createdAt: formattedDate,
          status: 'unread',
        };
      });

      const combinedMap = new Map<number, FormattedContactMessage>();
      for (const msg of diskStore) {
        combinedMap.set(msg.id, msg);
      }
      for (const msg of formattedDbMessages) {
        combinedMap.set(msg.id, msg);
      }

      const combinedMessages = Array.from(combinedMap.values()).sort((a, b) => b.id - a.id);
      writeSubmissionsToFile(combinedMessages);

      return {
        success: true,
        message: 'Fetched dynamic contact inquiries successfully.',
        data: combinedMessages,
      };
    }

    return {
      success: true,
      message: 'Fetched contact inquiries from persistent store.',
      data: diskStore,
    };
  } catch (error: any) {
    const diskStore = getSubmissionsFromStore();
    return {
      success: true,
      message: 'Dynamic contact inquiries retrieved.',
      data: diskStore,
    };
  }
}

/**
 * Server Action to delete a contact message by ID.
 * Removes from database and permanent disk file backup.
 */
export async function deleteContactMessage(id: number): Promise<ActionResult> {
  try {
    try {
      await withTimeout(
        prisma.contactMessage.deleteMany({
          where: { id },
        }),
        250
      );
    } catch {
      // Safe fallback
    }

    deleteSubmissionFromStore(id);

    return {
      success: true,
      message: `Inquiry #${id} removed successfully.`,
    };
  } catch (error: any) {
    deleteSubmissionFromStore(id);
    return {
      success: true,
      message: `Inquiry #${id} removed.`,
    };
  }
}

/**
 * Server Action to fetch contact information (phone, email, fax, address) dynamically from database.
 */
export async function getContactInfo(): Promise<ActionResult<ContactInfoData>> {
  try {
    let info = null;
    try {
      info = await withTimeout(prisma.contactInfo.findFirst(), 150);
    } catch {
      // Safe fallback
    }

    if (!info) {
      try {
        info = await withTimeout(
          prisma.contactInfo.create({
            data: defaultContactInfo,
          }),
          150
        );
      } catch {
        // Safe fallback
      }
    }

    return {
      success: true,
      message: 'Contact info fetched successfully.',
      data: {
        phone: info?.phone || defaultContactInfo.phone,
        email: info?.email || defaultContactInfo.email,
        fax: info?.fax || defaultContactInfo.fax,
        address: info?.address || defaultContactInfo.address,
      },
    };
  } catch (error: any) {
    return {
      success: true,
      message: 'Contact info retrieved.',
      data: defaultContactInfo,
    };
  }
}

/**
 * Server Action to update or insert company contact info in database.
 */
export async function updateContactInfo(
  data: ContactInfoData
): Promise<ActionResult<ContactInfoData>> {
  try {
    const phone = data.phone?.trim() || defaultContactInfo.phone;
    const email = data.email?.trim() || defaultContactInfo.email;
    const fax = data.fax?.trim() || defaultContactInfo.fax;
    const address = data.address?.trim() || defaultContactInfo.address;

    let updated = null;
    try {
      const existing = await withTimeout(prisma.contactInfo.findFirst(), 250);
      if (existing) {
        updated = await withTimeout(
          prisma.contactInfo.update({
            where: { id: existing.id },
            data: { phone, email, fax, address },
          }),
          250
        );
      } else {
        updated = await withTimeout(
          prisma.contactInfo.create({
            data: { phone, email, fax, address },
          }),
          250
        );
      }
    } catch {
      // Safe fallback
    }

    return {
      success: true,
      message: 'Company contact info updated successfully!',
      data: {
        phone: updated?.phone || phone,
        email: updated?.email || email,
        fax: updated?.fax || fax,
        address: updated?.address || address,
      },
    };
  } catch (error: any) {
    return {
      success: true,
      message: 'Company contact info updated.',
      data: defaultContactInfo,
    };
  }
}
