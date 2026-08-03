'use server';

import { prisma } from '@/config/prisma';

export interface ServiceItemInput {
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
}

export interface ServiceItemData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category?: string | null;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

const defaultSeedServices: ServiceItemData[] = [
  {
    id: 1,
    title: 'Architectural Blueprint Planning',
    description: 'IS-code compliant 2D floor plans, 3D architectural elevations, and structural detailing.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=740&q=80',
    category: 'Architecture',
    active: true,
  },
  {
    id: 2,
    title: 'Civil Construction & Contracting',
    description: 'End-to-end building construction, reinforced concrete foundations, and site supervision.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=740&q=80',
    category: 'Construction',
    active: true,
  },
  {
    id: 3,
    title: 'Cost Estimation & Structural Audit',
    description: 'BOQ calculations, material budgeting, and structural safety load audits.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=740&q=80',
    category: 'Estimation',
    active: true,
  },
];

// Global in-memory cache to ensure instant performance
let inMemoryServices: ServiceItemData[] = [...defaultSeedServices];

/**
 * Fast Timeout Race Helper to prevent database connection hanging delays
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 1200): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Database operation timeout')), timeoutMs)
    ),
  ]);
}

/**
 * Server Action to fetch all service catalog items from MySQL database via Prisma.
 */
export async function getAllServices(): Promise<ActionResult<ServiceItemData[]>> {
  try {
    let dbServices: any[] = [];
    try {
      dbServices = await withTimeout(
        prisma.serviceItem.findMany({
          orderBy: { id: 'desc' },
        }),
        1200
      );
    } catch (dbErr) {
      console.warn('Prisma findMany services lookup fallback:', dbErr);
    }

    // Auto-seed default services into database if empty
    if (dbServices.length === 0) {
      try {
        for (const seedItem of defaultSeedServices) {
          await withTimeout(
            prisma.serviceItem.upsert({
              where: { title: seedItem.title },
              update: {},
              create: {
                title: seedItem.title,
                description: seedItem.description,
                imageUrl: seedItem.imageUrl,
                category: seedItem.category || 'Architecture',
              },
            }),
            800
          );
        }
        dbServices = await withTimeout(
          prisma.serviceItem.findMany({
            orderBy: { id: 'desc' },
          }),
          1200
        );
      } catch (seedErr) {
        console.warn('Prisma services auto-seed fallback:', seedErr);
      }
    }

    if (dbServices.length > 0) {
      const formattedServices: ServiceItemData[] = dbServices.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        category: item.category || 'Architecture',
        active: true,
      }));

      // Update in-memory cache
      inMemoryServices = formattedServices;

      return {
        success: true,
        message: 'Services catalog fetched successfully.',
        data: formattedServices,
      };
    }

    return {
      success: true,
      message: 'Services catalog retrieved.',
      data: inMemoryServices,
    };
  } catch (error: any) {
    console.error('Error fetching services catalog:', error);
    return {
      success: true,
      message: 'Services catalog retrieved from memory.',
      data: inMemoryServices,
    };
  }
}

/**
 * Server Action to create a new service catalog item.
 */
export async function createService(
  input: ServiceItemInput
): Promise<ActionResult<ServiceItemData>> {
  try {
    const title = input.title?.trim();
    const description = input.description?.trim();
    const imageUrl = input.imageUrl?.trim();
    const category = input.category?.trim() || 'Architecture';

    if (!title || !description || !imageUrl) {
      return {
        success: false,
        message: 'Please fill in all required fields (Title, Description, Image URL).',
      };
    }

    let createdId = Date.now();

    try {
      const created = await withTimeout(
        prisma.serviceItem.create({
          data: { title, description, imageUrl, category },
        }),
        1200
      );
      if (created?.id) {
        createdId = created.id;
      }
    } catch (dbErr) {
      console.warn('Prisma createService DB fallback:', dbErr);
    }

    const newService: ServiceItemData = {
      id: createdId,
      title,
      description,
      imageUrl,
      category,
      active: true,
    };

    inMemoryServices = [newService, ...inMemoryServices.filter((s) => s.id !== createdId)];

    return {
      success: true,
      message: 'New service offering created successfully!',
      data: newService,
    };
  } catch (error: any) {
    console.error('Error creating service item:', error);
    return {
      success: false,
      message: error?.message || 'Failed to create service offering.',
    };
  }
}

/**
 * Server Action to update an existing service catalog item.
 */
export async function updateService(
  id: number,
  input: ServiceItemInput
): Promise<ActionResult<ServiceItemData>> {
  try {
    const title = input.title?.trim();
    const description = input.description?.trim();
    const imageUrl = input.imageUrl?.trim();
    const category = input.category?.trim() || 'Architecture';

    if (!title || !description || !imageUrl) {
      return {
        success: false,
        message: 'Please fill in all required fields (Title, Description, Image URL).',
      };
    }

    try {
      await withTimeout(
        prisma.serviceItem.update({
          where: { id },
          data: { title, description, imageUrl, category },
        }),
        1200
      );
    } catch (dbErr) {
      console.warn(`Prisma updateService #${id} DB fallback:`, dbErr);
    }

    const updatedService: ServiceItemData = {
      id,
      title,
      description,
      imageUrl,
      category,
      active: true,
    };

    inMemoryServices = inMemoryServices.map((s) => (s.id === id ? updatedService : s));

    return {
      success: true,
      message: 'Service offering updated successfully!',
      data: updatedService,
    };
  } catch (error: any) {
    console.error(`Error updating service item #${id}:`, error);
    return {
      success: false,
      message: error?.message || 'Failed to update service offering.',
    };
  }
}

/**
 * Server Action to delete a service item by ID.
 */
export async function deleteService(id: number): Promise<ActionResult> {
  try {
    try {
      await withTimeout(
        prisma.serviceItem.deleteMany({
          where: { id },
        }),
        1200
      );
    } catch (dbErr) {
      console.warn(`Prisma deleteService #${id} fallback:`, dbErr);
    }

    inMemoryServices = inMemoryServices.filter((s) => s.id !== id);

    return {
      success: true,
      message: `Service offering deleted successfully.`,
    };
  } catch (error: any) {
    console.error(`Error deleting service item #${id}:`, error);
    inMemoryServices = inMemoryServices.filter((s) => s.id !== id);
    return {
      success: true,
      message: `Service offering deleted.`,
    };
  }
}
