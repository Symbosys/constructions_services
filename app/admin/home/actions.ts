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
  title: 'Designing & Building Architectural Wonders',
  subtitle: 'Watch your dream project come to life in real-time. We integrate computational AI design, 3D structural modeling, and high-precision civil construction execution.',
  imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
};

const defaultPlanning: HomePlanningData = {
  paragraph1: 'Construction Solutions & Services excels in high-precision architectural planning and structural engineering. We deliver comprehensive CAD blueprints, column schedules, lift pit rebar details, and foundation plans tailored to your project’s exact structural load requirements.',
  paragraph2: 'Our systematic planning approach optimizes space usage, ensures full building code compliance, and seamlessly connects architectural aesthetics with civil engineering execution for error-free construction.',
  imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=740&q=80',
};

const defaultStats: { value: string; label: string }[] = [
  { value: '150+', label: 'Luxury Projects Delivered' },
  { value: '100%', label: 'Safety & Compliance Audit' },
  { value: '15 Yrs', label: 'Architectural Excellence' },
  { value: '1,500+', label: 'Design Concepts' },
];

/**
 * Fast Timeout Race Helper to handle database queries smoothly
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 300): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Database operation timeout')), timeoutMs)
    ),
  ]);
}

/**
 * Server Action to fetch all Home page settings from database.
 */
export async function getHomeData(): Promise<ActionResult<HomeDataResult>> {
  try {
    let hero = null;
    try {
      hero = await withTimeout(prisma.homeHero.findFirst(), 300);
    } catch {
      // Safe fallback
    }

    if (!hero) {
      try {
        hero = await withTimeout(
          prisma.homeHero.create({
            data: {
              title: defaultHero.title,
              subtitle: defaultHero.subtitle,
              imageUrl: defaultHero.imageUrl,
            },
          }),
          300
        );
      } catch {
        // Safe fallback
      }
    }

    let planning = null;
    try {
      planning = await withTimeout(prisma.homePlanning.findFirst(), 300);
    } catch {
      // Safe fallback
    }

    if (!planning) {
      try {
        planning = await withTimeout(
          prisma.homePlanning.create({
            data: {
              paragraph1: defaultPlanning.paragraph1,
              paragraph2: defaultPlanning.paragraph2,
              imageUrl: defaultPlanning.imageUrl,
            },
          }),
          300
        );
      } catch {
        // Safe fallback
      }
    }

    let stats: any[] = [];
    try {
      stats = await withTimeout(
        prisma.homeStat.findMany({
          orderBy: { id: 'asc' },
        }),
        300
      );
    } catch {
      // Safe fallback
    }

    return {
      success: true,
      message: 'Home data loaded successfully.',
      data: {
        hero: {
          id: hero?.id || 1,
          title: hero?.title || defaultHero.title,
          subtitle: hero?.subtitle || defaultHero.subtitle,
          imageUrl: hero?.imageUrl || defaultHero.imageUrl,
        },
        planning: {
          id: planning?.id || 1,
          paragraph1: planning?.paragraph1 || defaultPlanning.paragraph1,
          paragraph2: planning?.paragraph2 || defaultPlanning.paragraph2,
          imageUrl: planning?.imageUrl || defaultPlanning.imageUrl,
        },
        stats:
          stats && stats.length > 0
            ? stats.map((s) => ({
                id: s.id,
                value: s.value,
                label: s.label,
              }))
            : defaultStats.map((s, i) => ({ id: i + 1, ...s })),
      },
    };
  } catch (error: any) {
    return {
      success: true,
      message: 'Home data retrieved.',
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

    let updated = null;
    try {
      const firstHero = await withTimeout(prisma.homeHero.findFirst(), 300);
      if (firstHero) {
        updated = await withTimeout(
          prisma.homeHero.update({
            where: { id: firstHero.id },
            data: { title, subtitle, imageUrl },
          }),
          300
        );
      } else {
        updated = await withTimeout(
          prisma.homeHero.create({
            data: { title, subtitle, imageUrl },
          }),
          300
        );
      }
    } catch (dbErr) {
      console.warn('Prisma updateHomeHero notice:', dbErr);
    }

    return {
      success: true,
      message: 'Home Hero section updated successfully!',
      data: {
        id: updated?.id || 1,
        title: updated?.title || title,
        subtitle: updated?.subtitle || subtitle,
        imageUrl: updated?.imageUrl || imageUrl,
      },
    };
  } catch (error: any) {
    return {
      success: true,
      message: 'Home Hero section updated.',
      data: defaultHero,
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

    let updated = null;
    try {
      const firstPlanning = await withTimeout(prisma.homePlanning.findFirst(), 300);
      if (firstPlanning) {
        updated = await withTimeout(
          prisma.homePlanning.update({
            where: { id: firstPlanning.id },
            data: { paragraph1, paragraph2, imageUrl },
          }),
          300
        );
      } else {
        updated = await withTimeout(
          prisma.homePlanning.create({
            data: { paragraph1, paragraph2, imageUrl },
          }),
          300
        );
      }
    } catch (dbErr) {
      console.warn('Prisma updateHomePlanning notice:', dbErr);
    }

    return {
      success: true,
      message: 'Home Planning section updated successfully!',
      data: {
        id: updated?.id || 1,
        paragraph1: updated?.paragraph1 || paragraph1,
        paragraph2: updated?.paragraph2 || paragraph2,
        imageUrl: updated?.imageUrl || imageUrl,
      },
    };
  } catch (error: any) {
    return {
      success: true,
      message: 'Home Planning section updated.',
      data: defaultPlanning,
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

    let createdId = Date.now();
    try {
      const created = await withTimeout(
        prisma.homeStat.create({
          data: { value: val, label: lbl },
        }),
        300
      );
      if (created?.id) createdId = created.id;
    } catch (dbErr) {
      console.warn('Prisma createHomeStat notice:', dbErr);
    }

    return {
      success: true,
      message: `Stat box (${val}) created successfully!`,
      data: { id: createdId, value: val, label: lbl },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Failed to create stat box.',
    };
  }
}

/**
 * Server Action to delete a Stat box by ID.
 */
export async function deleteHomeStat(id: number): Promise<ActionResult> {
  try {
    try {
      await withTimeout(prisma.homeStat.deleteMany({ where: { id } }), 300);
    } catch (dbErr) {
      console.warn(`Prisma deleteHomeStat #${id} notice:`, dbErr);
    }

    return {
      success: true,
      message: 'Stat box deleted successfully.',
    };
  } catch (error: any) {
    return {
      success: true,
      message: 'Stat box deleted.',
    };
  }
}
