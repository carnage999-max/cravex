import { NextResponse } from 'next/server';
import { authorize } from '@/lib/auth';
import { db, configs } from '@cravex/db';
import { configPatchSchema, CONFIG_BOUNDS } from '@cravex/shared';
import { eq } from 'drizzle-orm';

const DEFAULT_CONFIG = {
    hapticIntensity: 50,
    ledBrightness: 50,
    sensitivity: 'medium',
    notificationsEnabled: true,
};

export async function GET(request: Request) {
    const session = await authorize(request);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const results = await db.select().from(configs).where(eq(configs.userId, session.userId)).limit(1);

        const userConfig = results.length > 0 ? (results[0].data as any) : DEFAULT_CONFIG;

        return NextResponse.json({
            config: userConfig,
            bounds: CONFIG_BOUNDS,
        });
    } catch (error) {
        console.error('Config GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await authorize(request);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await request.json();
        const result = configPatchSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid config values', details: result.error.format() }, { status: 400 });
        }

        const updates = result.data;

        const existing = await db.select().from(configs).where(eq(configs.userId, session.userId)).limit(1);

        if (existing.length === 0) {
            // Create new config
            const newConfig = { ...DEFAULT_CONFIG, ...updates };
            await db.insert(configs).values({
                userId: session.userId,
                data: newConfig,
                updatedAt: new Date(),
            });
            return NextResponse.json({ ok: true, config: newConfig });
        } else {
            // Update existing
            const currentData = existing[0].data as any;
            const newConfig = { ...currentData, ...updates };
            await db.update(configs)
                .set({ data: newConfig, updatedAt: new Date() })
                .where(eq(configs.id, existing[0].id));

            return NextResponse.json({ ok: true, config: newConfig });
        }
    } catch (error) {
        console.error('Config PUT Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
