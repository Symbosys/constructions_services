'use server';

import { prisma } from '@/config/prisma';

export interface HomeHeroData {
  id?: number;
  title?: string | null;
  subtitle?: string | null;
  imageUrl?: string | null;
}

export interface HomePlanningData {
  id?: number;
  paragraph1?: string | null;
  paragraph2?: string | null;
  imageUrl?: string | null;
}

export interface HomeStatData {
  id: number;
  value: string;
  label: string;
}

export interface HomeDataResult {
  hero: HomeHeroData;
  planning: HomePlanningData;
  stats: HomeStatData[];
}

export interface ActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

const defaultHero: HomeHeroData = {
  title: 'Designing Dream Homes & High-Rise Structures',
  subtitle: 'Explore full-bleed 3D architectural renders, structural blueprints, and IS-code compliant construction estimates.',
  imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
};

const defaultPlanning: HomePlanningData = {
  paragraph1: 'Comprehensive 2D & 3D Architectural Floor Plans and Structural Blueprints.',
  paragraph2: 'Engineered for safety, elegance, and durability with IS-code compliant standards.',
  imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=740&q=80',
};

const defaultStats: { value: string; label: string }[] = [
  { value: '150+', label: 'Luxury Projects Delivered' },
  { value: '100%', label: 'Safety & Compliance Audit' },
  { value: '15 Yrs', label: 'Architectural Excellence' },
];

/**
 * Server Action to fetch all Home page settings, Hero data, Planning data, and Stats from database.
 */
export async function getHomeData(): Promise<ActionResult<HomeDataResult>> {
  try {
    let hero = await prisma.homeHero.findFirst();
    if (!hero) {
      hero = await prisma.homeHero.create({
        data: {
          title: defaultHero.title,
          subtitle: defaultHero.subtitle,
          imageUrl: defaultHero.imageUrl,
        },
      });
    }

    let planning = await prisma.homePlanning.findFirst();
    if (!planning) {
      planning = await prisma.homePlanning.create({
        data: {
          paragraph1: defaultPlanning.paragraph1,
          paragraph2: defaultPlanning.paragraph2,
          imageUrl: defaultPlanning.imageUrl,
        },
      });
    }

    let stats = await prisma.homeStat.findMany({
      orderBy: { id: 'asc' },
    });

    if (stats.length === 0) {
      for (const stat of defaultStats) {
        await prisma.homeStat.create({ data: stat });
      }
      stats = await prisma.homeStat.findMany({ orderBy: { id: 'asc' } });
    }

    return {
      success: true,
      message: 'Home data loaded successfully from database.',
      data: {
        hero: {
          id: hero.id,
          title: hero.title || defaultHero.title,
          subtitle: hero.subtitle || defaultHero.subtitle,
          imageUrl: hero.imageUrl || defaultHero.imageUrl,
        },
        planning: {
          id: planning.id,
          paragraph1: planning.paragraph1 || defaultPlanning.paragraph1,
          paragraph2: planning.paragraph2 || defaultPlanning.paragraph2,
          imageUrl: planning.imageUrl || defaultPlanning.imageUrl,
        },
        stats: stats.map((s) => ({
          id: s.id,
          value: s.value,
          label: s.label,
        })),
      },
    };
  } catch (error: any) {
    console.error('Error fetching Home page data:', error);
    return {
      success: false,
      message: error?.message || 'Failed to fetch Home page data from database.',
      data: {
        hero: defaultHero,
        planning: defaultPlanning,
        stats: defaultStats.map((s, i) => ({ id: i + 1, ...s })),
      },
    };
  }
}

/**
 * Server Action to update Hero section content.
 */
export async function updateHomeHero(
  data: HomeHeroData
): Promise<ActionResult<HomeHeroData>> {
  try {
    const title = data.title?.trim() || defaultHero.title;
    const subtitle = data.subtitle?.trim() || defaultHero.subtitle;
    const imageUrl = data.imageUrl?.trim() || defaultHero.imageUrl;

    const firstHero = await prisma.homeHero.findFirst();
    let updated;

    if (firstHero) {
      updated = await prisma.homeHero.update({
        where: { id: firstHero.id },
        data: { title, subtitle, imageUrl },
      });
    } else {
      updated = await prisma.homeHero.create({
        data: { title, subtitle, imageUrl },
      });
    }

    return {
      success: true,
      message: 'Home Hero section updated successfully in database!',
      data: {
        id: updated.id,
        title: updated.title,
        subtitle: updated.subtitle,
        imageUrl: updated.imageUrl,
      },
    };
  } catch (error: any) {
    console.error('Error updating Home Hero:', error);
    return {
      success: false,
      message: error?.message || 'Failed to update Home Hero in database.',
    };
  }
}

/**
 * Server Action to update Planning section content.
 */
export async function updateHomePlanning(
  data: HomePlanningData
): Promise<ActionResult<HomePlanningData>> {
  try {
    const paragraph1 = data.paragraph1?.trim() || defaultPlanning.paragraph1;
    const paragraph2 = data.paragraph2?.trim() || defaultPlanning.paragraph2;
    const imageUrl = data.imageUrl?.trim() || defaultPlanning.imageUrl;

    const firstPlanning = await prisma.homePlanning.findFirst();
    let updated;

    if (firstPlanning) {
      updated = await prisma.homePlanning.update({
        where: { id: firstPlanning.id },
        data: { paragraph1, paragraph2, imageUrl },
      });
    } else {
      updated = await prisma.homePlanning.create({
        data: { paragraph1, paragraph2, imageUrl },
      });
    }

    return {
      success: true,
      message: 'Home Planning section updated successfully in database!',
      data: {
        id: updated.id,
        paragraph1: updated.paragraph1,
        paragraph2: updated.paragraph2,
        imageUrl: updated.imageUrl,
      },
    };
  } catch (error: any) {
    console.error('Error updating Home Planning:', error);
    return {
      success: false,
      message: error?.message || 'Failed to update Home Planning in database.',
    };
  }
}

/**
 * Server Action to create a new Stat box.
 */
export async function createHomeStat(
  value: string,
  label: string
): Promise<ActionResult<HomeStatData>> {
  try {
    const val = value.trim();
    const lbl = label.trim();

    if (!val || !lbl) {
      return {
        success: false,
        message: 'Both Value and Label are required.',
      };
    }

    const created = await prisma.homeStat.create({
      data: { value: val, label: lbl },
    });

    return {
      success: true,
      message: `Stat box (${val}) created successfully!`,
      data: { id: created.id, value: created.value, label: created.label },
    };
  } catch (error: any) {
    console.error('Error creating Home Stat:', error);
    return {
      success: false,
      message: error?.message || 'Failed to create stat box in database.',
    };
  }
}

/**
 * Server Action to delete a Stat box by ID.
 */
export async function deleteHomeStat(id: number): Promise<ActionResult> {
  try {
    await prisma.homeStat.delete({ where: { id } });
    return {
      success: true,
      message: 'Stat box deleted successfully from database.',
    };
  } catch (error: any) {
    console.error(`Error deleting Home Stat #${id}:`, error);
    return {
      success: false,
      message: error?.message || 'Failed to delete stat box.',
    };
  }
}
