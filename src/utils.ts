import { ServiceStats, ServiceEvent, MilestoneEvent } from "./types.js";
import { config, TOTAL_SERVICE_DAYS } from "./config.js";
import { holidays, milestones } from "./events.js";

/**
 * Get current date in Minsk timezone
 */
export function getCurrentDate(): Date {
  return new Date();
}

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: Date, date2: Date): number {
  const diffTime = date2.getTime() - date1.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date): boolean {
  return date.getTime() < getCurrentDate().getTime();
}

/**
 * Get milestone for a specific day number
 */
export function getMilestoneForDay(dayNumber: number): MilestoneEvent | null {
  return milestones.find((m) => m.dayNumber === dayNumber) || null;
}

/**
 * Calculate current service statistics
 */
export function getServiceStats(): ServiceStats {
  const now = getCurrentDate();
  const daysPassed = Math.max(0, daysBetween(config.startDate, now));
  const daysLeft = Math.max(0, daysBetween(now, config.endDate));
  const percentComplete = Math.min(
    100,
    (daysPassed / TOTAL_SERVICE_DAYS) * 100
  );

  // Separate events into past and future
  const allEvents = holidays.map((event) => ({
    ...event,
    isPast: isPast(event.date),
  }));

  const completedEvents = allEvents.filter((e) => e.isPast);
  const upcomingEvents = allEvents
    .filter((e) => !e.isPast)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  return {
    daysPassed,
    daysLeft,
    totalDays: TOTAL_SERVICE_DAYS,
    percentComplete,
    upcomingEvents,
    completedEvents,
    nextEvent,
  };
}

/**
 * Generate a progress bar
 */
export function generateProgressBar(
  percent: number,
  length: number = 20
): string {
  const filled = Math.round((percent / 100) * length);
  const empty = length - filled;
  return "▓".repeat(filled) + "░".repeat(empty);
}

/**
 * Format date in Russian
 */
export function formatDate(date: Date): string {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Get a random funny message based on progress
 */
export function getRandomFunnyMessage(
  percentComplete: number,
  isGirlfriend: boolean = false
): string {
  if (percentComplete < 10) {
    const girlfriendMessages = [
      "💪 Служба только началась! Поддержи его!",
      "🎖️ Первые дни самые сложные, но вы справитесь!",
      "🪖 Он молодец! Напиши ему что-нибудь доброе!",
      "⚔️ Начало положено! Вы оба сильные!",
    ];
    const generalMessages = [
      "💪 Служба только началась! Он держится!",
      "🎖️ Первые дни - самые сложные, но он справляется!",
      "🪖 Он молодец! Все верят в него!",
      "⚔️ Начало положено! Он на верном пути!",
    ];
    const messages = isGirlfriend ? girlfriendMessages : generalMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  } else if (percentComplete < 25) {
    const girlfriendMessages = [
      "🔥 Он втягивается! Твоя поддержка помогает!",
      "💪 Он уже не новичок!",
      "🎯 Первая четверть почти позади!",
      "⭐ Он молодец! Продолжай его поддерживать!",
    ];
    const generalMessages = [
      "🔥 Он втягивается! Так держать!",
      "💪 Он уже не новичок!",
      "🎯 Первая четверть почти позади!",
      "⭐ Он молодец! Продолжает в том же духе!",
    ];
    const messages = isGirlfriend ? girlfriendMessages : generalMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  } else if (percentComplete < 50) {
    const girlfriendMessages = [
      "🚀 Уже больше четверти! Скоро встретитесь!",
      "🎊 Скоро половина! Вы справляетесь!",
      "💫 Он уже почти на середине пути!",
      "🌟 Отлично! Половина всё ближе!",
    ];
    const generalMessages = [
      "🚀 Уже больше четверти! Летит время!",
      "🎊 Скоро половина! Терпение!",
      "💫 Он уже почти на середине!",
      "🌟 Отлично идёт! Половина близко!",
    ];
    const messages = isGirlfriend ? girlfriendMessages : generalMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  } else if (percentComplete < 75) {
    const girlfriendMessages = [
      "🎉 БОЛЬШЕ ПОЛОВИНЫ! Встреча всё ближе!",
      "🏆 Большая часть позади! Держитесь!",
      "🎊 Уже можно мечтать о встрече!",
      "💯 Больше половины - вы справляетесь!",
    ];
    const generalMessages = [
      "🎉 БОЛЬШЕ ПОЛОВИНЫ! Дальше легче!",
      "🏆 Большая часть позади!",
      "🎊 Уже можно мечтать о возвращении!",
      "💯 Больше половины - это победа!",
    ];
    const messages = isGirlfriend ? girlfriendMessages : generalMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  } else if (percentComplete < 90) {
    const girlfriendMessages = [
      "🏁 Финишная прямая! Скоро обнимете друг друга!",
      "🎆 Уже совсем скоро встретитесь!",
      "🎉 Осталось совсем чуть-чуть!",
      "🔥 Последний рывок! Он почти дома!",
    ];
    const generalMessages = [
      "🏁 Финишная прямая!",
      "🎆 Уже совсем скоро он дома!",
      "🎉 Осталось совсем чуть-чуть!",
      "🔥 Последний рывок! Он почти дома!",
    ];
    const messages = isGirlfriend ? girlfriendMessages : generalMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  } else {
    const girlfriendMessages = [
      "🎊 ПОСЛЕДНИЕ ДНИ! Совсем скоро увидитесь!",
      "🏆 Он почти дома! Готовься к встрече!",
      "🎉 Возвращение уже на пороге!",
      "💪 Последние дни! Вы так долго ждали этого!",
    ];
    const generalMessages = [
      "🎊 ПОСЛЕДНИЕ ДНИ! Он держится!",
      "🏆 Он почти свободен!",
      "🎉 Возвращение уже стучится в дверь!",
      "💪 Последний рывок! Все его ждут!",
    ];
    const messages = isGirlfriend ? girlfriendMessages : generalMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  }
}

/**
 * Format service event for display
 */
export function formatEvent(
  event: ServiceEvent,
  showDate: boolean = true
): string {
  const daysUntil = daysBetween(getCurrentDate(), event.date);
  let text = `${event.emoji} <b>${event.title}</b>`;

  if (showDate) {
    text += `\n   📅 ${formatDate(event.date)}`;
  }

  if (!event.isPast && daysUntil > 0) {
    text += `\n   ⏳ Через ${daysUntil} ${getDayWord(daysUntil)}`;
  } else if (event.isPast) {
    text += " ✅";
  }

  if (event.description) {
    text += `\n   💬 ${event.description}`;
  }

  return text;
}

/**
 * Get correct word form for days in Russian
 */
export function getDayWord(days: number): string {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "дней";
  }

  if (lastDigit === 1) {
    return "день";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "дня";
  }

  return "дней";
}
