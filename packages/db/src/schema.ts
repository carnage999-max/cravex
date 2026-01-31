import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    otpCode: text('otp_code'),
    otpExpiresAt: timestamp('otp_expires_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    tokenHash: text('token_hash').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const devices = pgTable('devices', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    label: text('label'),
    lastSeenAt: timestamp('last_seen_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const configs = pgTable('configs', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    deviceId: uuid('device_id').references(() => devices.id),
    data: jsonb('data').notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const events = pgTable('events', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    deviceId: uuid('device_id').references(() => devices.id),
    type: text('type').notNull(),
    payload: jsonb('payload'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const trendSummaries = pgTable('trend_summaries', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    range: text('range').notNull(), // '7d', '30d'
    data: jsonb('data').notNull(),
    computedAt: timestamp('computed_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    devices: many(devices),
    configs: many(configs),
    events: many(events),
    sessions: many(sessions),
}));

export const devicesRelations = relations(devices, ({ one, many }) => ({
    user: one(users, {
        fields: [devices.userId],
        references: [users.id],
    }),
    events: many(events),
    configs: many(configs),
}));
