'use server';

import { prisma } from '@/config/prisma';

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

export interface FormattedContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  domain?: string | null;
  message: string;
  createdAt: string;
  status?: string;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Server Action to submit a contact form message and save it into the database via Prisma.
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

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        domain,
        message,
      },
    });

    return {
      success: true,
      message: 'Your message has been submitted successfully! We will contact you shortly.',
    };
  } catch (error) {
    console.error('Error in submitContactMessage Server Action:', error);
    return {
      success: false,
      message: 'Failed to submit your message due to a server error. Please try again.',
    };
  }
}

/**
 * Server Action to fetch all contact messages from database for admin view.
 */
export async function getAllContactMessages(): Promise<ActionResult<FormattedContactMessage[]>> {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    const formattedMessages: FormattedContactMessage[] = messages.map((msg) => ({
      id: msg.id,
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      domain: msg.domain,
      message: msg.message,
      createdAt: new Date(msg.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'unread',
    }));

    return {
      success: true,
      message: 'Fetched all contact messages successfully.',
      data: formattedMessages,
    };
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return {
      success: false,
      message: 'Failed to retrieve contact messages from database.',
      data: [],
    };
  }
}

/**
 * Server Action to delete a contact message by ID.
 */
export async function deleteContactMessage(id: number): Promise<ActionResult> {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    return {
      success: true,
      message: `Message #${id} deleted successfully.`,
    };
  } catch (error) {
    console.error(`Error deleting message #${id}:`, error);
    return {
      success: false,
      message: 'Failed to delete contact message.',
    };
  }
}

/**
 * Server Action to fetch contact information (phone, email, fax, address) from database.
 */
export async function getContactInfo(): Promise<ActionResult<ContactInfoData>> {
  const fallbackInfo: ContactInfoData = {
    phone: '+91 92969 98511',
    email: 'contructionsolutionsservices@gmail.com',
    fax: '+1 (800) 555-5678',
    address: 'Harmu Housing basant bihar colony B1 Ranchi 834002',
  };

  try {
    const info = await prisma.contactInfo.findFirst();
    if (info) {
      return {
        success: true,
        message: 'Contact info fetched successfully.',
        data: {
          phone: info.phone || fallbackInfo.phone,
          email: info.email || fallbackInfo.email,
          fax: info.fax || fallbackInfo.fax,
          address: info.address || fallbackInfo.address,
        },
      };
    }
    return {
      success: true,
      message: 'Default contact info retrieved.',
      data: fallbackInfo,
    };
  } catch (error) {
    console.warn('Unable to query contact info from DB, returning fallback:', error);
    return {
      success: true,
      message: 'Fallback contact info retrieved.',
      data: fallbackInfo,
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
    const existing = await prisma.contactInfo.findFirst();
    let updated;
    if (existing) {
      updated = await prisma.contactInfo.update({
        where: { id: existing.id },
        data: {
          phone: data.phone,
          email: data.email,
          fax: data.fax,
          address: data.address,
        },
      });
    } else {
      updated = await prisma.contactInfo.create({
        data: {
          phone: data.phone,
          email: data.email,
          fax: data.fax,
          address: data.address,
        },
      });
    }

    return {
      success: true,
      message: 'Company contact info updated successfully!',
      data: {
        phone: updated.phone,
        email: updated.email,
        fax: updated.fax,
        address: updated.address,
      },
    };
  } catch (error) {
    console.error('Error updating contact info:', error);
    return {
      success: false,
      message: 'Failed to update company contact info.',
    };
  }
}
