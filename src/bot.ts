import { Bot, Context, InlineKeyboard } from "grammy";
import {
  generateStatsMessage,
  generateEventsMessage,
  generateMilestonesMessage,
  generateCountdownMessage,
  generateHelpMessage,
  generateMotivationMessage,
  generateWelcomeMessage,
} from "./messages.js";
import { config } from "./config.js";

/**
 * Check if user is the girlfriend
 */
function isGirlfriend(ctx: Context): boolean {
  const userId = ctx.from?.id?.toString();
  return (
    userId === config.girlfriendTelegramId && config.girlfriendTelegramId !== ""
  );
}

/**
 * Create and configure the bot
 */
export function createBot(token: string): Bot {
  const bot = new Bot(token);

  // Middleware for error handling
  bot.catch((err) => {
    console.error("Error in bot:", err);
  });

  // Start command
  bot.command("start", async (ctx: Context) => {
    const isGf = isGirlfriend(ctx);
    await ctx.reply(generateWelcomeMessage(isGf), {
      parse_mode: "HTML",
      reply_markup: getMainKeyboard(),
    });
  });

  // Help command
  bot.command("help", async (ctx: Context) => {
    const isGf = isGirlfriend(ctx);
    await ctx.reply(generateHelpMessage(isGf), {
      parse_mode: "HTML",
      reply_markup: getMainKeyboard(),
    });
  });

  // Stats command - main feature
  bot.command("stats", async (ctx: Context) => {
    const isGf = isGirlfriend(ctx);
    await ctx.reply(generateStatsMessage(isGf), {
      parse_mode: "HTML",
      reply_markup: getMainKeyboard(),
    });
  });

  // Countdown command
  bot.command("countdown", async (ctx: Context) => {
    const isGf = isGirlfriend(ctx);
    await ctx.reply(generateCountdownMessage(isGf), {
      parse_mode: "HTML",
      reply_markup: getMainKeyboard(),
    });
  });

  // Events command
  bot.command("events", async (ctx: Context) => {
    await ctx.reply(generateEventsMessage(), {
      parse_mode: "HTML",
      reply_markup: getMainKeyboard(),
    });
  });

  // Milestones command
  bot.command("milestones", async (ctx: Context) => {
    await ctx.reply(generateMilestonesMessage(), {
      parse_mode: "HTML",
      reply_markup: getMainKeyboard(),
    });
  });

  // Motivation command
  bot.command("motivation", async (ctx: Context) => {
    const isGf = isGirlfriend(ctx);
    await ctx.reply(generateMotivationMessage(isGf), {
      parse_mode: "HTML",
      reply_markup: getMainKeyboard(),
    });
  });

  // Handle callback queries from inline keyboard
  bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;
    const isGf = isGirlfriend(ctx);

    let message = "";
    switch (data) {
      case "stats":
        message = generateStatsMessage(isGf);
        break;
      case "countdown":
        message = generateCountdownMessage(isGf);
        break;
      case "events":
        message = generateEventsMessage();
        break;
      case "milestones":
        message = generateMilestonesMessage();
        break;
      case "motivation":
        message = generateMotivationMessage(isGf);
        break;
      default:
        await ctx.answerCallbackQuery("Неизвестная команда");
        return;
    }

    await ctx.editMessageText(message, {
      parse_mode: "HTML",
      reply_markup: getMainKeyboard(),
    });
    await ctx.answerCallbackQuery();
  });

  // Handle any text message with helpful response
  bot.on("message:text", async (ctx: Context) => {
    const text = ctx.message?.text?.toLowerCase() || "";
    const isGf = isGirlfriend(ctx);

    if (
      text.includes("статус") ||
      text.includes("сколько") ||
      text.includes("когда") ||
      text.includes("дней")
    ) {
      await ctx.reply(generateStatsMessage(isGf), {
        parse_mode: "HTML",
        reply_markup: getMainKeyboard(),
      });
    } else if (
      text.includes("мотив") ||
      text.includes("держись") ||
      text.includes("сил")
    ) {
      await ctx.reply(generateMotivationMessage(isGf), {
        parse_mode: "HTML",
        reply_markup: getMainKeyboard(),
      });
    } else if (text.includes("событи") || text.includes("праздник")) {
      await ctx.reply(generateEventsMessage(), {
        parse_mode: "HTML",
        reply_markup: getMainKeyboard(),
      });
    } else {
      await ctx.reply(
        "Используй команды или кнопки ниже! 👇\nНапиши /help для списка команд.",
        {
          reply_markup: getMainKeyboard(),
        }
      );
    }
  });

  return bot;
}

/**
 * Create inline keyboard with main actions
 */
function getMainKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text("📊 Статистика", "stats")
    .text("⏰ Отсчёт", "countdown")
    .row()
    .text("🎉 События", "events")
    .text("🏆 Вехи", "milestones")
    .row()
    .text("💪 Мотивация", "motivation");
}
