import {
  getServiceStats,
  generateProgressBar,
  formatDate,
  getRandomFunnyMessage,
  formatEvent,
  getDayWord,
  getMilestoneForDay,
} from "./utils";
import { config } from "./config";

/**
 * Generate the main stats message
 */
export function generateStatsMessage(isGirlfriend: boolean = false): string {
  const stats = getServiceStats();
  const progressBar = generateProgressBar(stats.percentComplete);
  const funnyMessage = getRandomFunnyMessage(
    stats.percentComplete,
    isGirlfriend
  );

  // Check for milestone today
  const todayMilestone = getMilestoneForDay(stats.daysPassed);
  const milestoneText = todayMilestone
    ? `\n\n${todayMilestone.emoji} <b>СЕГОДНЯ ОСОБЫЙ ДЕНЬ!</b>\n${todayMilestone.title}\n💬 ${todayMilestone.description}`
    : "";

  const greeting = isGirlfriend
    ? "💝 <b>СТАТУС СЛУЖБЫ ТВОЕГО ЛЮБИМОГО</b> 🇧🇾"
    : "🪖 <b>СТАТУС СЛУЖБЫ В АРМИИ РБ</b> 🇧🇾";

  let message = `
${greeting}

📊 <b>Прогресс:</b>
${progressBar} ${stats.percentComplete.toFixed(1)}%

📅 <b>Дней прошло:</b> ${stats.daysPassed} из ${stats.totalDays}
⏳ <b>Осталось дней:</b> ${stats.daysLeft}

📆 <b>Даты:</b>
🚀 Начало службы: ${formatDate(config.startDate)}
🏠 ${isGirlfriend ? "Он вернётся" : "Возвращение"}: ${formatDate(config.endDate)}
${milestoneText}

${funnyMessage}
`;

  // Add next event if exists
  if (stats.nextEvent) {
    message += `\n\n🎯 <b>Следующее событие:</b>\n${formatEvent(stats.nextEvent, true)}`;
  }

  return message.trim();
}

/**
 * Generate events list message
 */
export function generateEventsMessage(): string {
  const stats = getServiceStats();

  let message = `🎉 <b>СОБЫТИЯ И ПРАЗДНИКИ</b>\n\n`;

  if (stats.upcomingEvents.length > 0) {
    message += `📅 <b>Предстоящие события:</b>\n\n`;
    stats.upcomingEvents.forEach((event) => {
      message += formatEvent(event, true) + "\n\n";
    });
  }

  if (stats.completedEvents.length > 0) {
    message += `\n✅ <b>Пройденные события:</b> ${stats.completedEvents.length}\n`;
  }

  return message.trim();
}

/**
 * Generate milestones message
 */
export function generateMilestonesMessage(): string {
  const stats = getServiceStats();
  const milestones = [
    { day: 1, name: "Первый день", emoji: "🎯" },
    { day: 7, name: "Неделя службы", emoji: "📅" },
    { day: 30, name: "Месяц службы", emoji: "🗓️" },
    { day: 50, name: "50 дней", emoji: "⚡" },
    { day: 69, name: "День 69", emoji: "😏" },
    { day: 91, name: "ПОЛОВИНА!", emoji: "🎊" },
    { day: 100, name: "100 дней!", emoji: "💯" },
    { day: 150, name: "150 дней", emoji: "🔥" },
    { day: 160, name: "Меньше месяца!", emoji: "🏁" },
    { day: 170, name: "Последние недели", emoji: "⏰" },
    { day: 175, name: "Последняя неделя!", emoji: "🎉" },
  ];

  let message = `🏆 <b>ВЕХИ СЛУЖБЫ</b>\n\n`;

  milestones.forEach((milestone) => {
    const status =
      stats.daysPassed >= milestone.day
        ? "✅"
        : stats.daysPassed + 1 === milestone.day
          ? "👉"
          : "⏳";
    message += `${status} ${milestone.emoji} <b>День ${milestone.day}</b> - ${milestone.name}\n`;
  });

  return message.trim();
}

/**
 * Generate countdown message
 */
export function generateCountdownMessage(
  isGirlfriend: boolean = false
): string {
  const stats = getServiceStats();
  const weeks = Math.floor(stats.daysLeft / 7);
  const remainingDays = stats.daysLeft % 7;

  const header = isGirlfriend
    ? "⏰ <b>ОБРАТНЫЙ ОТСЧЁТ ДО ВСТРЕЧИ</b>\n\n💕 До того момента, как ты снова обнимешь его:"
    : "⏰ <b>ОБРАТНЫЙ ОТСЧЁТ</b>\n\n🏠 До возвращения домой:";

  let message = `
${header}

📅 <b>${stats.daysLeft}</b> ${getDayWord(stats.daysLeft)}
`;

  if (weeks > 0) {
    message += `\n📆 Это примерно <b>${weeks}</b> ${getWeekWord(weeks)}`;
    if (remainingDays > 0) {
      message += ` и <b>${remainingDays}</b> ${getDayWord(remainingDays)}`;
    }
  }

  const hours = stats.daysLeft * 24;
  const minutes = hours * 60;
  message += `\n\n⏱️ Или:\n`;
  message += `   • <b>${hours}</b> часов\n`;
  message += `   • <b>${minutes}</b> минут\n`;
  message += `   • <b>${minutes * 60}</b> секунд\n`;

  // Add motivational message
  if (stats.daysLeft < 7) {
    message += isGirlfriend
      ? `\n🎉 <b>ПОСЛЕДНЯЯ НЕДЕЛЯ! Скоро он будет дома!</b>`
      : `\n🎉 <b>ПОСЛЕДНЯЯ НЕДЕЛЯ! УРА!</b>`;
  } else if (stats.daysLeft < 30) {
    message += isGirlfriend
      ? `\n🔥 <b>Осталось меньше месяца до встречи!</b>`
      : `\n🔥 <b>Осталось меньше месяца!</b>`;
  } else if (stats.percentComplete > 50) {
    message += isGirlfriend
      ? `\n💪 <b>Больше половины позади! Он справляется!</b>`
      : `\n💪 <b>Больше половины позади!</b>`;
  } else {
    message += isGirlfriend
      ? `\n💫 <b>Каждый день приближает вас друг к другу!</b>`
      : `\n💫 <b>Каждый день приближает к дому!</b>`;
  }

  return message.trim();
}

/**
 * Get correct word form for weeks in Russian
 */
function getWeekWord(weeks: number): string {
  const lastDigit = weeks % 10;
  const lastTwoDigits = weeks % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "недель";
  }

  if (lastDigit === 1) {
    return "неделя";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "недели";
  }

  return "недель";
}

/**
 * Generate help message
 */
export function generateHelpMessage(isGirlfriend: boolean = false): string {
  const aboutText = isGirlfriend
    ? "Этот бот создан, чтобы помочь тебе следить за службой твоего любимого и получать поддержку."
    : "Этот бот создан, чтобы помочь близким отслеживать срочную службу в армии Беларуси.";

  const endMessage = isGirlfriend
    ? "Держитесь! Скоро встретитесь! 💕"
    : "Он справится! Скоро вернётся домой! 🏠";

  return `
🤖 <b>КОМАНДЫ БОТА</b>

📊 /stats - Текущая статистика службы
⏰ /countdown - Обратный отсчёт до возвращения
🎉 /events - Праздники и события
🏆 /milestones - Вехи службы
💬 /motivation - Мотивация на день
📖 /help - Это сообщение

<b>О боте:</b>
${aboutText}

Срок службы: 29 октября 2025 - 29 апреля 2026

${endMessage}
`.trim();
}

/**
 * Generate motivation message
 */
export function generateMotivationMessage(
  isGirlfriend: boolean = false
): string {
  const girlfriendMotivations = [
    "💕 Твоя любовь и поддержка помогают ему каждый день!",
    "🌟 Он знает, что ты ждёшь его, и это даёт ему силы!",
    "💝 Скоро вы снова будете вместе - держитесь!",
    "🔥 Ваша связь сильнее любых расстояний!",
    "⚡ Каждый день приближает вас к встрече!",
    "🎯 Твоё терпение и любовь делают его сильнее!",
    "💫 После этого испытания вы станете ещё ближе!",
    "🚀 Время летит быстрее, чем кажется! Скоро встреча!",
    "🎊 Представляй, как вы обнимитесь при встрече!",
    "🌈 Трудные времена делают любовь крепче!",
    "💖 Он думает о тебе каждый день!",
    "🏠 Скоро он вернётся домой к тебе!",
    "⭐ Ты его вдохновение и опора!",
    "🎖️ Вы оба проходите через это испытание!",
    "🔆 Каждое доброе слово от тебя - это его сила!",
  ];

  const generalMotivations = [
    "💪 Каждый день он становится сильнее!",
    "🌟 Он знает, что вы все его ждёте!",
    "🏆 Он справится! Верьте в него!",
    "🔥 Служба - это опыт, который делает его сильнее!",
    "⚡ Каждый день приближает его к дому!",
    "🎯 Он держится и не сдаётся!",
    "💫 Скоро он вернётся с новыми историями!",
    "🚀 Время летит быстрее, чем кажется!",
    "🎊 Скоро он снова будет с вами!",
    "🌈 После трудностей всегда наступает радость!",
    "💝 Ваша поддержка очень важна для него!",
    "🏠 Дом и семья всегда ждут его!",
    "⭐ Он герой для всех близких!",
    "🎖️ Он проходит через важное испытание!",
    "🔆 Каждый новый день - это маленькая победа!",
  ];

  const motivations = isGirlfriend ? girlfriendMotivations : generalMotivations;
  const randomMotivation =
    motivations[Math.floor(Math.random() * motivations.length)];
  const stats = getServiceStats();

  return `
🌟 <b>МОТИВАЦИЯ НА ДЕНЬ</b>

${randomMotivation}

📊 Уже пройдено: ${stats.percentComplete.toFixed(1)}%
⏳ Осталось всего: ${stats.daysLeft} ${getDayWord(stats.daysLeft)}

${getRandomFunnyMessage(stats.percentComplete, isGirlfriend)}
`.trim();
}

/**
 * Generate welcome message
 */
export function generateWelcomeMessage(isGirlfriend: boolean = false): string {
  if (isGirlfriend) {
    return `
👋 <b>Привет, любимая!</b> 💕

Я бот, который поможет тебе отслеживать службу твоего парня в армии Беларуси! 🇧🇾

Здесь ты можешь узнать:
• Сколько дней он уже служит и сколько осталось
• Какие праздники и события впереди
• Вехи службы и прогресс
• Получить мотивацию и поддержку

Напиши /help чтобы увидеть все команды.

💝 Он обязательно вернётся! Держитесь вместе! 🏠
`.trim();
  }

  return `
👋 <b>Привет!</b>

Я бот, который помогает отслеживать срочную службу в армии Беларуси! 🇧🇾

Здесь вы можете узнать:
• Сколько дней он уже служит и сколько осталось
• Какие праздники и события впереди
• Вехи службы и прогресс
• Получить информацию о его службе

Напиши /help чтобы увидеть все команды.

💪 Он обязательно справится! Вы все его ждёте! 🏠
`.trim();
}
