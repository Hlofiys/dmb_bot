import {
  getServiceStats,
  generateProgressBar,
  formatDate,
  getRandomFunnyMessage,
  formatEvent,
  getDayWord,
  getMilestoneForDay,
} from './utils';
import { config } from './config';

/**
 * Generate the main stats message
 */
export function generateStatsMessage(): string {
  const stats = getServiceStats();
  const progressBar = generateProgressBar(stats.percentComplete);
  const funnyMessage = getRandomFunnyMessage(stats.percentComplete);

  // Check for milestone today
  const todayMilestone = getMilestoneForDay(stats.daysPassed);
  const milestoneText = todayMilestone
    ? `\n\n${todayMilestone.emoji} <b>СЕГОДНЯ ОСОБЫЙ ДЕНЬ!</b>\n${todayMilestone.title}\n💬 ${todayMilestone.description}`
    : '';

  let message = `
🪖 <b>СТАТУС СЛУЖБЫ В АРМИИ РБ</b> 🇧🇾

📊 <b>Прогресс:</b>
${progressBar} ${stats.percentComplete.toFixed(1)}%

📅 <b>Дней прошло:</b> ${stats.daysPassed} из ${stats.totalDays}
⏳ <b>Осталось дней:</b> ${stats.daysLeft}

📆 <b>Даты:</b>
🚀 Начало: ${formatDate(config.startDate)}
🏠 Возвращение: ${formatDate(config.endDate)}
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
      message += formatEvent(event, true) + '\n\n';
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
    { day: 1, name: 'Первый день', emoji: '🎯' },
    { day: 7, name: 'Неделя службы', emoji: '📅' },
    { day: 30, name: 'Месяц службы', emoji: '🗓️' },
    { day: 50, name: '50 дней', emoji: '⚡' },
    { day: 69, name: 'День 69', emoji: '😏' },
    { day: 91, name: 'ПОЛОВИНА!', emoji: '🎊' },
    { day: 100, name: '100 дней!', emoji: '💯' },
    { day: 150, name: '150 дней', emoji: '🔥' },
    { day: 160, name: 'Меньше месяца!', emoji: '🏁' },
    { day: 170, name: 'Последние недели', emoji: '⏰' },
    { day: 175, name: 'Последняя неделя!', emoji: '🎉' },
  ];

  let message = `🏆 <b>ВЕХИ СЛУЖБЫ</b>\n\n`;

  milestones.forEach((milestone) => {
    const status =
      stats.daysPassed >= milestone.day
        ? '✅'
        : stats.daysPassed + 1 === milestone.day
        ? '👉'
        : '⏳';
    message += `${status} ${milestone.emoji} <b>День ${milestone.day}</b> - ${milestone.name}\n`;
  });

  return message.trim();
}

/**
 * Generate countdown message
 */
export function generateCountdownMessage(): string {
  const stats = getServiceStats();
  const weeks = Math.floor(stats.daysLeft / 7);
  const remainingDays = stats.daysLeft % 7;

  let message = `
⏰ <b>ОБРАТНЫЙ ОТСЧЁТ</b>

🏠 До возвращения домой:

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
    message += `\n🎉 <b>ПОСЛЕДНЯЯ НЕДЕЛЯ! УРА!</b>`;
  } else if (stats.daysLeft < 30) {
    message += `\n🔥 <b>Осталось меньше месяца!</b>`;
  } else if (stats.percentComplete > 50) {
    message += `\n💪 <b>Больше половины позади!</b>`;
  } else {
    message += `\n💫 <b>Каждый день приближает к дому!</b>`;
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
    return 'недель';
  }

  if (lastDigit === 1) {
    return 'неделя';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'недели';
  }

  return 'недель';
}

/**
 * Generate help message
 */
export function generateHelpMessage(): string {
  return `
🤖 <b>КОМАНДЫ БОТА</b>

📊 /stats - Текущая статистика службы
⏰ /countdown - Обратный отсчёт до дембеля
🎉 /events - Праздники и события
🏆 /milestones - Вехи службы
💬 /motivation - Мотивация на день
📖 /help - Это сообщение

<b>О боте:</b>
Этот бот создан, чтобы помочь близким отслеживать срочную службу в армии Беларуси. 

Срок службы: 29 октября 2025 - 29 апреля 2026

Держись, солдат! Скоро домой! 🏠
`.trim();
}

/**
 * Generate motivation message
 */
export function generateMotivationMessage(): string {
  const motivations = [
    '💪 Каждый день делает тебя сильнее!',
    '🌟 Твоя семья и девушка гордятся тобой!',
    '🏆 Ты справишься! Мы верим в тебя!',
    '🔥 Служба - это опыт, который сделает тебя лучше!',
    '⚡ Каждое утро ты на шаг ближе к дому!',
    '🎯 Сила воли - твоё главное оружие!',
    '💫 После армии всё остальное покажется лёгким!',
    '🚀 Время летит быстрее, чем кажется!',
    '🎊 Скоро ты будешь рассказывать истории о службе!',
    '🌈 После дождя всегда выходит солнце!',
    '💝 Твоя девушка ждёт тебя! Держись!',
    '🏠 Дом всегда будет ждать тебя!',
    '⭐ Ты герой для своих близких!',
    '🎖️ Настоящие мужчины проходят через испытания!',
    '🔆 Каждый новый день - маленькая победа!',
  ];

  const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
  const stats = getServiceStats();

  return `
🌟 <b>МОТИВАЦИЯ НА ДЕНЬ</b>

${randomMotivation}

📊 Уже пройдено: ${stats.percentComplete.toFixed(1)}%
⏳ Осталось всего: ${stats.daysLeft} ${getDayWord(stats.daysLeft)}

${getRandomFunnyMessage(stats.percentComplete)}
`.trim();
}

/**
 * Generate welcome message
 */
export function generateWelcomeMessage(): string {
  return `
👋 <b>Привет!</b>

Я бот, который помогает отслеживать срочную службу в армии Беларуси! 🇧🇾

Используй команды, чтобы узнать:
• Сколько дней прошло и сколько осталось
• Какие праздники и события впереди
• Вехи службы и прогресс

Напиши /help чтобы увидеть все команды.

💪 Держись, солдат! Мы все тебя ждём! 🏠
`.trim();
}
