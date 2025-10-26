import dotenv from "dotenv";
import { createBot } from "./bot.js";
import { config } from "./config.js";

// Load environment variables
dotenv.config();

/**
 * Main function to start the bot
 */
async function main() {
  // Validate bot token
  if (!config.botToken) {
    console.error("❌ Error: BOT_TOKEN is not set in environment variables!");
    console.error("Please create a .env file with your bot token:");
    console.error("BOT_TOKEN=your_bot_token_here");
    process.exit(1);
  }

  try {
    // Create bot instance
    const bot = createBot(config.botToken);

    // Get bot info
    const botInfo = await bot.api.getMe();
    console.log("✅ Bot started successfully!");
    console.log(`🤖 Bot username: @${botInfo.username}`);
    console.log(
      `📅 Service period: ${config.startDate.toLocaleDateString()} - ${config.endDate.toLocaleDateString()}`
    );
    console.log("🚀 Bot is running... Press Ctrl+C to stop.\n");

    // Start bot with long polling
    await bot.start({
      onStart: () => {
        console.log("📡 Listening for messages...\n");
      },
    });
  } catch (error) {
    console.error("❌ Failed to start bot:", error);
    process.exit(1);
  }
}

// Handle process termination
process.once("SIGINT", () => {
  console.log("\n👋 Bot stopped by user");
  process.exit(0);
});

process.once("SIGTERM", () => {
  console.log("\n👋 Bot stopped");
  process.exit(0);
});

// Start the bot
main();
