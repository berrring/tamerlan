export type MediaType = "image" | "video";

export interface MediaAsset {
  type: MediaType;
  src: string;
  alt: string;
  poster?: string;
}

export interface SceneFrame {
  title: string;
  body: string[];
  quote?: string;
}

export interface Chapter {
  id: string;
  navLabel: string;
  title: string;
  subtitle?: string;
  mediaCaption: string;
  mediaDisclaimer?: string;
  mediaCredit?: string;
  heightVh: number;
  layout: "media-left" | "media-right";
  backdrop: MediaAsset;
  sideMedia: MediaAsset;
  frames: SceneFrame[];
}

export interface LongreadContent {
  brand: string;
  hero: {
    id: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    mediaCaption: string;
    mediaDisclaimer?: string;
    mediaCredit?: string;
    media: MediaAsset;
  };
  chapters: Chapter[];
  sources: Array<{ label: string; href: string }>;
  authors: string;
}

const MEDIA = {
  hero: "/assets/timur/user-image-01-registan.webp",
  contextBackdrop: "/assets/timur/context-zafarnama-1480.jpg",
  contextSide: "/assets/timur/user-image-03-portrait.jpg",
  campaignsBackdrop: "/assets/timur/sources-timur-empire.jpg",
  campaignsSide: "/assets/timur/user-image-02-equestrian.webp",
  impactBackdrop: "/assets/timur/impact-osh-suleiman-hill.jpg",
  impactSide: "/assets/timur/user-image-07-registan-stock.jpg",
  memoryBackdrop: "/assets/timur/memory-registan.jpg",
  memorySide: "/assets/timur/user-image-08-seated-stock.jpg",
  sourcesBackdrop: "/assets/timur/user-image-06-timurid-map.png",
  sourcesSide: "/assets/timur/user-image-03-portrait.jpg",
} as const;

const CREDITS = {
  hero: "Фото пользователя (Image #1)",
  context: "Фото пользователя (Image #3)",
  campaigns: "Фото пользователя (Image #2)",
  impact: "Фото пользователя (Image #1, обновленное)",
  memory: "Фото пользователя (Image #2, обновленное)",
  sources: "Фото пользователя (Images #3 и #6)",
} as const;

export const timurContent: LongreadContent = {
  brand: "TIMUR.LIFE",
  hero: {
    id: "hero",
    eyebrow: "XIV ВЕК • СЕМИРЕЧЬЕ • ТЯНЬ-ШАНЬ",
    title: "Амир Тимур (Тамерлан)",
    subtitle: "и его след в истории Кыргызстана",
    cta: "Исследовать эпоху",
    mediaCaption: "Регистан, Самарканд",
    mediaDisclaimer: "Фотография добавлена пользователем.",
    mediaCredit: CREDITS.hero,
    media: {
      type: "image",
      src: MEDIA.hero,
      alt: "Площадь Регистан в Самарканде",
    },
  },
  chapters: [
    {
      id: "context",
      navLabel: "Контекст",
      title: "Исторический контекст",
      subtitle: "Распад Чагатайского улуса и борьба за регион",
      mediaCaption: "Портретная репрезентация Амира Тимура",
      mediaDisclaimer: "Портрет является художественным образом, а не прижизненной фотографией.",
      mediaCredit: CREDITS.context,
      heightVh: 300,
      layout: "media-right",
      backdrop: {
        type: "image",
        src: MEDIA.contextBackdrop,
        alt: "Миниатюра из Зафарнаме о Тимуре",
      },
      sideMedia: {
        type: "image",
        src: MEDIA.contextSide,
        alt: "Живописный портрет Амира Тимура",
      },
      frames: [
        {
          title: "Кризис Чагатайского улуса",
          body: [
            "После распада империи Чингисхана регион разделился на западный Мавераннахр (исламский, оседлый) и восточный Моголистан (кочевой).",
            "Территория современного Кыргызстана в XIV веке стала ареной ожесточенной борьбы между этими политическими центрами.",
          ],
        },
        {
          title: "Кто такой Амир Тимур",
          body: [
            "Амир Тимур — выходец из тюркизированного монгольского племени барлас.",
            "Не будучи Чингизидом, он не мог носить титул «хан», поэтому именовался «Великим эмиром».",
          ],
        },
        {
          title: "Восхождение и прозвище",
          body: [
            "Пройдя путь от предводителя небольшого отряда до правителя огромной империи со столицей в Самарканде, он объединил разрозненные владения Средней Азии.",
            "Прозвище «Тимур-и-Лянг» (Тимур Хромой) связано с ранением в молодости, которое не помешало его военной карьере.",
          ],
        },
      ],
    },
    {
      id: "campaigns",
      navLabel: "Походы",
      title: "Военные походы",
      subtitle: "Экспансия на север и восток в 1370–1390 гг.",
      mediaCaption: "Конная статуя Амира Темура как символ военной эпохи",
      mediaDisclaimer: "Современный памятник используется как визуальный образ полководца.",
      mediaCredit: CREDITS.campaigns,
      heightVh: 320,
      layout: "media-left",
      backdrop: {
        type: "image",
        src: MEDIA.campaignsBackdrop,
        alt: "Карта владений Тимура с историческими городами региона",
      },
      sideMedia: {
        type: "image",
        src: MEDIA.campaignsSide,
        alt: "Конный памятник Амиру Темуру на фоне ясного неба",
      },
      frames: [
        {
          title: "Цели экспансии",
          body: [
            "Основным противником Тимура был могольский эмир Камар ад-Дин.",
            "Чтобы обезопасить свои границы, Тимур совершил более 5 крупных походов вглубь Тянь-Шаня и Прииссыккулья.",
          ],
        },
        {
          title: "География сражений",
          body: [
            "Войска Тимура доходили до верховьев реки Или и предгорий Энильчека.",
            "Летописи описывают тяжелые переходы через перевалы Тянь-Шаня, где армия страдала от холода, но сохраняла боеспособность.",
          ],
        },
        {
          title: "Последствия походов",
          body: [
            "Кочевые племена были вынуждены отступать в труднодоступные горные районы.",
            "Это способствовало их изоляции и одновременно сохранению самобытной культуры.",
          ],
          quote:
            "Походы 1370–1390 гг. стали катализатором больших политических изменений в регионе.",
        },
        {
          title: "Дополнительные факторы",
          body: [
            "Тимур стремился контролировать торговые караваны Шелкового пути: маршруты через Фергану и Тянь-Шань имели стратегическое значение.",
            "Походы на север нередко сопровождались религиозной риторикой распространения ислама среди кочевников Моголистана.",
          ],
        },
      ],
    },
    {
      id: "impact",
      navLabel: "Влияние",
      title: "Основные заслуги и влияние",
      subtitle: "Разрушение, интеграция и новый политический баланс",
      mediaCaption: "Архитектурное наследие Самарканда в эпохе Тимуридов",
      mediaDisclaimer: "Фотография использована как визуальный акцент культурного наследия эпохи.",
      mediaCredit: CREDITS.impact,
      heightVh: 300,
      layout: "media-right",
      backdrop: {
        type: "image",
        src: MEDIA.impactBackdrop,
        alt: "Панорама Сулайман-Тоо в Оше",
      },
      sideMedia: {
        type: "image",
        src: MEDIA.impactSide,
        alt: "Архитектурный ансамбль Самарканда с бирюзовым куполом",
      },
      frames: [
        {
          title: "Двойственность эпохи",
          body: [
            "С одной стороны — разрушение городов Чуйской долины, с другой — расцвет южных регионов (Ош, Узген) как части большой империи.",
            "Город Ош при Тимуридах стал важным административным центром: развивались ремесла, строились мечети и медресе.",
          ],
        },
        {
          title: "Экономика и инфраструктура",
          body: [
            "В Ферганской долине, включая части современного Кыргызстана, восстанавливались и расширялись ирригационные каналы.",
            "Это дало новый импульс земледелию и укрепило хозяйственные связи региона.",
          ],
        },
        {
          title: "Политическое наследие",
          body: [
            "Сокрушив политическую структуру Моголистана, Тимур расчистил путь для усиления кыргызских племенных объединений.",
            "Позже именно эти объединения вышли на историческую арену как самостоятельная сила.",
          ],
        },
      ],
    },
    {
      id: "memory",
      navLabel: "Память",
      title: "Историческое значение сегодня",
      subtitle: "Легенды, культурный код и взгляд современности",
      mediaCaption: "Монумент Амиру Темуру в современной городской среде",
      mediaDisclaimer: "Снимок памятника используется как образ исторической памяти.",
      mediaCredit: CREDITS.memory,
      heightVh: 290,
      layout: "media-left",
      backdrop: {
        type: "image",
        src: MEDIA.memoryBackdrop,
        alt: "Исторический вид Самарканда и площади Регистана",
      },
      sideMedia: {
        type: "image",
        src: MEDIA.memorySide,
        alt: "Сидячий памятник Амиру Темуру на ступенчатом постаменте",
      },
      frames: [
        {
          title: "Факты и легенды",
          body: [
            "Курганы Сан-Таш («счетные камни»): по преданию, Тимур приказал воинам складывать камни для учета численности армии.",
            "Трон на Сулайман-Тоо: в Оше существует легенда, что Тамерлан молился на вершине священной горы.",
            "Иссык-Кульские затонувшие города: ряд гипотез связывает разрушение некоторых поселений с карательными экспедициями войск Тамерлана.",
          ],
        },
        {
          title: "Итог эпохи",
          body: [
            "Тамерлан был жестким завоевателем, но его деятельность привела к окончательному падению монгольского господства на Тянь-Шане.",
            "В вакууме власти после его походов началось активное объединение кыргызских родов.",
          ],
          quote:
            "Историю Кыргызстана сложно рассматривать в отрыве от эпохи Тимуридов.",
        },
        {
          title: "Культурный код современности",
          body: [
            "Эпоха Тимуридов рассматривается как период высокого средневековья, когда регион был тесно интегрирован в мусульманский мир и науку.",
            "Сохранившиеся объекты в Ошской и Баткенской областях имеют государственное значение и привлекают туристов и паломников.",
            "Изучение Тимура помогает понять сложные этнические процессы и формирование современного облика кыргызской нации.",
          ],
        },
      ],
    },
    {
      id: "sources",
      navLabel: "Источники",
      title: "Источники",
      subtitle: "Материалы, использованные в исходной работе",
      mediaCaption: "Карта Тимуридской империи (фон) и портрет Тимура (правая колонка)",
      mediaDisclaimer: "В разделе использованы изображения, присланные пользователем.",
      mediaCredit: CREDITS.sources,
      heightVh: 220,
      layout: "media-right",
      backdrop: {
        type: "image",
        src: MEDIA.sourcesBackdrop,
        alt: "Карта Тимуридской империи в максимальных границах",
      },
      sideMedia: {
        type: "image",
        src: MEDIA.sourcesSide,
        alt: "Портрет Амира Тимура",
      },
      frames: [
        {
          title: "Список материалов",
          body: [
            "Портал «История Кыргызстана», туристический портал Central Asia Travel, ресурс «Мол Булак», «КиберЛенинка», «Новая литература Кыргызстана», Википедия.",
            "Авторы исходного материала: Тюлькиев Ален, Шаршенбеков Аяз, Рахманов Азирет.",
            "Спасибо за внимание.",
          ],
        },
      ],
    },
  ],
  sources: [
    { label: "Портал «История Кыргызстана»", href: "https://kghistory.akipress.org" },
    { label: "Central Asia Travel", href: "https://www.centralasia-travel.com" },
    { label: "Информационный ресурс «Мол Булак»", href: "https://www.molbulak.ru" },
    { label: "КиберЛенинка", href: "https://cyberleninka.ru" },
    { label: "Новая литература Кыргызстана", href: "https://www.literatura.kg" },
    { label: "Википедия", href: "https://ru.wikipedia.org" },
    { label: "Wikimedia Commons (изображения)", href: "https://commons.wikimedia.org" },
  ],
  authors: "Тюлькиев Ален, Шаршенбеков Аяз, Рахманов Азирет",
};


