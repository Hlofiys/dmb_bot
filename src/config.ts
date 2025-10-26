export const config = {
  // Service dates
  startDate: new Date("2025-10-29T00:00:00+03:00"), // October 29, 2025
  endDate: new Date("2026-04-29T00:00:00+03:00"), // April 29, 2026

  // Timezone
  timezone: "Europe/Minsk",

  // Bot token from environment
  botToken: process.env.BOT_TOKEN || "",

  // Special user IDs
  girlfriendTelegramId: process.env.GIRLFRIEND_TELEGRAM_ID || "",
} as const;

// Calculate total service days
export const TOTAL_SERVICE_DAYS = Math.ceil(
  (config.endDate.getTime() - config.startDate.getTime()) /
    (1000 * 60 * 60 * 24)
);
