import { z } from 'zod';

// --- AUTH ---
export const authRequestOtpSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
});

export const authVerifyOtpSchema = z.object({
    email: z.string().email(),
    code: z.string().length(6, { message: "Code must be 6 digits" }),
});

// --- DEVICES ---
export const deviceBindSchema = z.object({
    deviceId: z.string().uuid({ message: "Invalid device ID" }),
    label: z.string().max(50).optional(),
});

// Safe ranges for configuration
export const CONFIG_BOUNDS = {
    hapticIntensity: { min: 0, max: 100 },
    ledBrightness: { min: 0, max: 100 },
} as const;

export const configSchema = z.object({
    hapticIntensity: z.number().min(CONFIG_BOUNDS.hapticIntensity.min).max(CONFIG_BOUNDS.hapticIntensity.max),
    ledBrightness: z.number().min(CONFIG_BOUNDS.ledBrightness.min).max(CONFIG_BOUNDS.ledBrightness.max),
    sensitivity: z.enum(['low', 'medium', 'high']),
    notificationsEnabled: z.boolean(),
    // Add other calibration parameters here
});

export const configPatchSchema = configSchema.partial();

// --- EVENTS ---
export const eventItemSchema = z.object({
    type: z.string(),
    payload: z.record(z.any()).optional(),
    createdAt: z.string().datetime().optional(), // ISO string
});

export const eventBatchSchema = z.object({
    deviceId: z.string().uuid(),
    events: z.array(eventItemSchema).max(100),
});

// --- SUPPORT ---
export const contactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// --- TYPES ---
export type AuthRequestOtp = z.infer<typeof authRequestOtpSchema>;
export type AuthVerifyOtp = z.infer<typeof authVerifyOtpSchema>;
export type DeviceBind = z.infer<typeof deviceBindSchema>;
export type AppConfig = z.infer<typeof configSchema>;
export type AppConfigPatch = z.infer<typeof configPatchSchema>;
export type EventItem = z.infer<typeof eventItemSchema>;
export type EventBatch = z.infer<typeof eventBatchSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
