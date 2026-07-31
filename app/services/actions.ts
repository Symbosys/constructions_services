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

const defaultSeedServices: ServiceItemInput[] = [
  {
    title: 'Architectural Blueprint Planning',
    description: 'IS-code compliant 2D floor plans, 3D architectural elevations, and structural detailing.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=740&q=80',
    category: 'Architecture',
  },
  {
    title: 'Civil Construction & Contracting',
    description: 'End-to-end building construction, reinforced concrete foundations, and site supervision.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=740&q=80',
    category: 'Construction',
  },
  {
    title: 'Cost Estimation & Structural Audit',
    description: 'BOQ calculations, material budgeting, and structural safety load audits.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=740&q=80',
    category: 'Estimation',
  },
];

/**
 * Server Action to fetch all service catalog items from MySQL database via Prisma.
 * Automatically seeds default items if DB is empty.
 */
export async function getAllServices(): Promise<ActionResult<ServiceItemData[]>> {
  try {
    let services = await prisma.serviceItem.findMany({
      orderBy: { id: 'desc' },
    });

    if (services.length === 0) {
      for (const item of defaultSeedServices) {
        try {
          await prisma.serviceItem.create({
            data: {
              title: item.title,
              description: item.description,
              imageUrl: item.imageUrl,
              category: item.category || 'Architecture',
            },
          });
        } catch {
          // Ignore duplicate title errors during initial seeding
        }
      }
      services = await prisma.serviceItem.findMany({
        orderBy: { id: 'desc' },
      });
    }

    const formattedServices: ServiceItemData[] = services.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category || 'Architecture',
      active: true,
    }));

    return {
      success: true,
      message: 'Services catalog fetched successfully.',
      data: formattedServices,
    };
  } catch (error: any) {
    console.error('Error fetching services catalog:', error);
    return {
      success: false,
      message: error?.message || 'Failed to retrieve services catalog from database.',
      data: defaultSeedServices.map((s, idx) => ({ id: idx + 1, ...s, active: true })),
    };
  }
}

/**
 * Server Action to create a new service catalog item in database.
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

    const existing = await prisma.serviceItem.findUnique({
      where: { title },
    });

    if (existing) {
      const updated = await prisma.serviceItem.update({
        where: { id: existing.id },
        data: { title, description, imageUrl, category },
      });
      return {
        success: true,
        message: 'Service offering updated successfully in database!',
        data: {
          id: updated.id,
          title: updated.title,
          description: updated.description,
          imageUrl: updated.imageUrl,
          category: updated.category || 'Architecture',
          active: true,
        },
      };
    }

    const newService = await prisma.serviceItem.create({
      data: {
        title,
        description,
        imageUrl,
        category,
      },
    });

    return {
      success: true,
      message: 'New service offering created successfully in database!',
      data: {
        id: newService.id,
        title: newService.title,
        description: newService.description,
        imageUrl: newService.imageUrl,
        category: newService.category || 'Architecture',
        active: true,
      },
    };
  } catch (error: any) {
    console.error('Error creating service item:', error);
    return {
      success: false,
      message: error?.message || 'Failed to create service offering due to a database error.',
    };
  }
}

/**
 * Server Action to update an existing service catalog item in database.
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

    let updated;
    const existingById = await prisma.serviceItem.findUnique({ where: { id } });

    if (existingById) {
      updated = await prisma.serviceItem.update({
        where: { id },
        data: {
          title,
          description,
          imageUrl,
          category,
        },
      });
    } else {
      const existingByTitle = await prisma.serviceItem.findUnique({ where: { title } });
      if (existingByTitle) {
        updated = await prisma.serviceItem.update({
          where: { id: existingByTitle.id },
          data: {
            title,
            description,
            imageUrl,
            category,
          },
        });
      } else {
        updated = await prisma.serviceItem.create({
          data: {
            title,
            description,
            imageUrl,
            category,
          },
        });
      }
    }

    return {
      success: true,
      message: 'Service offering updated successfully in database!',
      data: {
        id: updated.id,
        title: updated.title,
        description: updated.description,
        imageUrl: updated.imageUrl,
        category: updated.category || 'Architecture',
        active: true,
      },
    };
  } catch (error: any) {
    console.error(`Error updating service item #${id}:`, error);
    return {
      success: false,
      message: error?.message || 'Failed to update service offering in database.',
    };
  }
}

/**
 * Server Action to delete a service item from database by ID.
 */
export async function deleteService(id: number): Promise<ActionResult> {
  try {
    const existing = await prisma.serviceItem.findUnique({ where: { id } });
    if (existing) {
      await prisma.serviceItem.delete({
        where: { id },
      });
    }
    return {
      success: true,
      message: `Service offering deleted successfully.`,
    };
  } catch (error: any) {
    console.error(`Error deleting service item #${id}:`, error);
    return {
      success: false,
      message: error?.message || 'Failed to delete service item from database.',
    };
  }
}
