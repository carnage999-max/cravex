import { NextResponse } from 'next/server';
import { authorize } from '@/lib/auth';
import { db, events } from '@cravex/db';
import { and, eq, gte, sql } from 'drizzle-orm';

export async function GET(request: Request) {
    const session = await authorize(request);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const range = searchParams.get('range') || '7d';
        const days = range === '30d' ? 30 : 7;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Simple aggregation: count events by type
        const summary = await db.select({
            type: events.type,
            count: sql<number>`cast(count(${events.id}) as int)`,
        })
            .from(events)
            .where(and(
                eq(events.userId, session.userId),
                gte(events.createdAt, startDate)
            ))
            .groupBy(events.type);

        return NextResponse.json({
            range,
            startDate: startDate.toISOString(),
            summary,
        });
    } catch (error) {
        console.error('Trends GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
