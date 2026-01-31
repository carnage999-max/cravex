import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

const envPath = path.resolve(__dirname, "../../.env.local");
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
}

if (!process.env.DATABASE_URL) {
    // During build time on Vercel, the DATABASE_URL might not be strictly required 
    // for some commands, but for 'migrate' it is.
    console.warn("WARNING: DATABASE_URL is missing from environment");
}

export default {
    schema: "./src/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
} satisfies Config;
