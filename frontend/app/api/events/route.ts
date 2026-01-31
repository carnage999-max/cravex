import { NextResponse } from 'next/server';
import { authorize } from '@/lib/auth';
import { db, events, devices } from '@cravex/db';
import { eventBatchSchema } from '@cravex/shared';
import { eq, and } from 'drizzle-orm';

export async function POST(request: Request) {
    const session = await authorize(request);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await request.json();
        const result = eventBatchSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid payload', details: result.error.format() }, { status: 400 });
        }

        const { deviceId, events: eventItems } = result.data;

        // Verify device ownership
        const device = await db.select().from(devices)
            .where(and(eq(devices.id, deviceId), eq(devices.userId, session.userId)))
            .limit(1);

        if (device.length === 0) {
            return NextResponse.json({ error: 'Device not found or not owned by user' }, { status: 404 });
        }

        if (eventItems.length === 0) {
            return NextResponse.json({ ok: true });
        }

        const records = eventItems.map(e => ({
            userId: session.userId,
            deviceId: deviceId,
            type: e.type,
            payload: e.payload,
            createdAt: e.createdAt ? new Date(e.createdAt) : new Date(),
        }));

        await db.insert(events).values(records);

        return NextResponse.json({ ok: true, count: records.length });
    } catch (error) {
        console.error('Events POST Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const session = await authorize(request);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { searchParams } = new URL(request.url);
        const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

        const results = await db.select()
            .from(events)
            .where(eq(events.userId, session.userId))
            .orderBy(events.createdAt)
            .limit(limit);

        return NextResponse.json({
            events: results
        });
    } catch (error) {
        console.error('Events GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
