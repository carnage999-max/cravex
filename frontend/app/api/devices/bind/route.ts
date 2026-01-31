import { NextResponse } from 'next/server';
import { authorize } from '@/lib/auth';
import { db, devices, users } from '@cravex/db';
import { deviceBindSchema } from '@cravex/shared';
import { eq, and } from 'drizzle-orm';

export async function POST(request: Request) {
    const session = await authorize(request);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const result = deviceBindSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error.format() }, { status: 400 });
        }

        const { deviceId, label } = result.data;

        // Check if device already exists
        const existingDevice = await db.select().from(devices).where(eq(devices.id, deviceId)).limit(1);

        if (existingDevice.length > 0) {
            const dev = existingDevice[0];
            if (dev.userId !== session.userId) {
                return NextResponse.json({ error: 'Device already bound to another user' }, { status: 409 });
            }
            // Update label if provided
            if (label) {
                await db.update(devices).set({ label, lastSeenAt: new Date() }).where(eq(devices.id, deviceId));
            }
        } else {
            // Create new device binding
            await db.insert(devices).values({
                id: deviceId,
                userId: session.userId,
                label: label || 'My Device',
                lastSeenAt: new Date(),
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Device Bind Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
