import { ServiceEvent, MilestoneEvent } from "./types.js";

// Special holidays and events
export const holidays: ServiceEvent[] = [
  {
    date: new Date("2025-11-01T00:00:00+03:00"),
    title: "День Всех Святых",
    emoji: "🎃",
    description: "Первые дни позади!",
  },
  {
    date: new Date("2025-11-07T00:00:00+03:00"),
    title: "День Октябрьской революции",
    emoji: "🚩",
  },
  {
    date: new Date("2025-12-25T00:00:00+03:00"),
    title: "Католическое Рождество",
    emoji: "🎄",
    description: "Почти два месяца службы!",
  },
  {
    date: new Date("2025-12-27T00:00:00+03:00"),
    title: "День рождения Ани! 🎂",
    emoji: "🎁",
    description: "Ане исполняется 19 лет! 💝",
  },
  {
    date: new Date("2025-12-31T00:00:00+03:00"),
    title: "Новый Год 2026",
    emoji: "🎆",
    description: "С Новым Годом! Скоро домой!",
  },
  {
    date: new Date("2026-01-01T00:00:00+03:00"),
    title: "Новый Год",
    emoji: "🥳",
    description: "Первый день нового года на службе",
  },
  {
    date: new Date("2026-01-07T00:00:00+03:00"),
    title: "Православное Рождество",
    emoji: "⭐",
  },
  {
    date: new Date("2026-02-01T00:00:00+03:00"),
    title: "ДЕНЬ РОЖДЕНИЯ! 🎂",
    emoji: "🎉",
    description: "Тебе 20 лет! Уже взрослый солдат!",
  },
  {
    date: new Date("2026-02-14T00:00:00+03:00"),
    title: "День Святого Валентина",
    emoji: "💝",
    description: "Любовь на расстоянии - самая крепкая!",
  },
  {
    date: new Date("2026-02-23T00:00:00+03:00"),
    title: "День защитника Отечества",
    emoji: "🪖",
    description: "Это твой праздник, солдат!",
  },
  {
    date: new Date("2026-03-08T00:00:00+03:00"),
    title: "Международный женский день",
    emoji: "🌹",
    description: "Не забудь поздравить девушку!",
  },
  {
    date: new Date("2026-03-25T00:00:00+03:00"),
    title: "День Воли (Беларусь)",
    emoji: "🤍",
  },
  {
    date: new Date("2026-04-01T00:00:00+03:00"),
    title: "День смеха",
    emoji: "😂",
    description: "Осталось совсем чуть-чуть!",
  },
  {
    date: new Date("2026-04-12T00:00:00+03:00"),
    title: "Пасха",
    emoji: "🥚",
    description: "Последние дни службы!",
  },
];

// Service milestones (special day numbers)
export const milestones: MilestoneEvent[] = [
  {
    dayNumber: 1,
    title: "Первый день службы",
    emoji: "🎯",
    description: "Началось приключение длиною в полгода!",
  },
  {
    dayNumber: 7,
    title: "Неделя позади",
    emoji: "📅",
    description: "Первая неделя - самая сложная!",
  },
  {
    dayNumber: 30,
    title: "Месяц службы!",
    emoji: "🗓️",
    description: "Уже целый месяц! Ты молодец!",
  },
  {
    dayNumber: 50,
    title: "50 дней службы",
    emoji: "⚡",
    description: "Половина первой сотни!",
  },
  {
    dayNumber: 69,
    title: "День 69",
    emoji: "😏",
    description: "Nice.",
  },
  {
    dayNumber: 91,
    title: "ПОЛОВИНА ПРОЙДЕНА! 🎊",
    emoji: "🎊",
    description: "Ровно половина службы позади! Дальше будет легче!",
  },
  {
    dayNumber: 100,
    title: "100 дней службы!",
    emoji: "💯",
    description: "Сотка! Больше половины позади!",
  },
  {
    dayNumber: 150,
    title: "150 дней!",
    emoji: "🔥",
    description: "Осталось меньше месяца!",
  },
  {
    dayNumber: 160,
    title: "Осталось меньше месяца!",
    emoji: "🏁",
    description: "Финишная прямая!",
  },
  {
    dayNumber: 170,
    title: "Последние недели",
    emoji: "⏰",
    description: "Уже можно считать часы!",
  },
  {
    dayNumber: 175,
    title: "Последняя неделя!",
    emoji: "🎉",
    description: "Совсем скоро дома!",
  },
];
