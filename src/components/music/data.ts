export const ARTIST_IMG = "https://cdn.poehali.dev/projects/9992db9f-301f-43aa-836c-991a69170ed5/files/f6b80b0a-4787-4064-9d35-1a1a2e2da7e1.jpg";
export const STUDIO_IMG = "https://cdn.poehali.dev/projects/9992db9f-301f-43aa-836c-991a69170ed5/files/4cffebb8-cd39-44dc-b913-d474c9ce4730.jpg";
export const CONCERT_IMG = "https://cdn.poehali.dev/projects/9992db9f-301f-43aa-836c-991a69170ed5/files/370ad1c8-0234-4711-9b25-7c83bed2c6fb.jpg";

const CDN = "https://cdn.poehali.dev/projects/9992db9f-301f-43aa-836c-991a69170ed5/files";

export const tracks = [
  { id: 1,  title: "Добрая песня",                src: `${CDN}/добрая песня.mp3` },
  { id: 2,  title: "Подари мне, Бог",             src: `${CDN}/Подари мне, Бог.mp3` },
  { id: 3,  title: "Разошлись",                   src: `${CDN}/Разошлись.mp3` },
  { id: 4,  title: "Давайте собираться у стола",  src: `${CDN}/Давайте собираться у стола.mp3` },
  { id: 5,  title: "Вокзал",                      src: `${CDN}/Вокзал.mp3` },
  { id: 6,  title: "Самолет",                     src: `${CDN}/Самолет.mp3` },
  { id: 7,  title: "Счастья не получается",       src: `${CDN}/Счастья не получается.mp3` },
  { id: 8,  title: "Я люблю Тебя. Отчаянно",      src: `${CDN}/Я люблю Тебя. Отчаянно.mp3` },
  { id: 9,  title: "Фронтовые письма",            src: `${CDN}/Фронтовые письма.mp3` },
  { id: 10, title: "Он защищал Сталинград",       src: `${CDN}/Он защищал Сталинград.mp3` },
  { id: 11, title: "Гармонь солдатская",          src: `${CDN}/Гармонь солдатская.mp3` },
  { id: 12, title: "Вальс победителей",           src: `${CDN}/Вальс победителей.mp3` },
];

export const albums = [
  { id: 1, title: "VOID EP",      year: "2024", tracks: 5, cover: ARTIST_IMG },
  { id: 2, title: "Singularity",  year: "2023", tracks: 8, cover: STUDIO_IMG },
  { id: 3, title: "Fragments",    year: "2022", tracks: 6, cover: CONCERT_IMG },
];

export const photos = [
  { id: 1, src: ARTIST_IMG,  label: "Студия, 2024" },
  { id: 2, src: STUDIO_IMG,  label: "Запись альбома" },
  { id: 3, src: CONCERT_IMG, label: "Концерт, Москва" },
  { id: 4, src: ARTIST_IMG,  label: "За кулисами" },
  { id: 5, src: STUDIO_IMG,  label: "Творческий процесс" },
  { id: 6, src: CONCERT_IMG, label: "Фестиваль 2023" },
];

export const posts = [
  {
    id: 1,
    date: "28 апреля 2026",
    tag: "Релиз",
    title: "Новый EP «VOID» уже доступен",
    excerpt: "Пять треков, записанных в тишине ночного студийного марафона. Это самый личный материал за всё время.",
  },
  {
    id: 2,
    date: "12 апреля 2026",
    tag: "События",
    title: "Концерт в Москве: итоги",
    excerpt: "Больше тысячи человек, три часа музыки, один момент — когда всё замолкло и осталась только частота.",
  },
  {
    id: 3,
    date: "03 марта 2026",
    tag: "Процесс",
    title: "Как рождается звук: взгляд изнутри",
    excerpt: "Заметки о создании атмосферных текстур, работе с синтезаторами и том, почему тишина — тоже инструмент.",
  },
];

export type Section = "home" | "music" | "gallery" | "blog";

export type Track = typeof tracks[0];
