
import { Language } from '../types';

const strings: Record<string, Record<Language, string>> = {
    // App.tsx / Nav
    navHome: { ru: 'KazAI', en: 'KazAI', kk: 'KazAI' },
    navMentor: { ru: 'AI Коуч', en: 'AI Coach', kk: 'AI Коуч' },
    navCourses: { ru: 'Академия', en: 'Academy', kk: 'Академия' },
    navPlanner: { ru: 'Бизнес-план', en: 'Business Plan', kk: 'Бизнес-жоспар' },
    navCommunity: { ru: 'Нетворкинг', en: 'Networking', kk: 'Нетворкинг' },

    // HomePage.tsx
    welcome: { ru: 'С возвращением', en: 'Welcome back', kk: 'Қош келдіңіз' },
    level: { ru: 'Стадия', en: 'Stage', kk: 'Кезең' },
    continueLearning: { ru: 'Продолжить акселерацию', en: 'Continue Acceleration', kk: 'Акселерацияны жалғастыру' },
    aiRecommendation: { ru: 'Инсайт от KazAI', en: 'Insight from KazAI', kk: 'KazAI инсайты' },
    askMore: { ru: 'Детализировать', en: 'Deep Dive', kk: 'Толығырақ' },
    showSources: { ru: 'База знаний', en: 'Knowledge Base', kk: 'Білім базасы' },
    yourCourses: { ru: 'Треки обучения', en: 'Learning Tracks', kk: 'Оқу тректері' },
    details: { ru: 'Открыть', en: 'Open', kk: 'Ашу' },
    newsAndEvents: { ru: 'Дайджест индустрии', en: 'Industry Digest', kk: 'Индустрия дайджесті' },
    quickActions: { ru: 'Инструменты', en: 'Tools', kk: 'Құралдар' },
    askAI: { ru: 'Чат с экспертом', en: 'Expert Chat', kk: 'Эксперт чаты' },
    ideaGenerator: { ru: 'Валидатор идей', en: 'Idea Validator', kk: 'Идея валидаторы' },
    myProgress: { ru: 'Мои KPI', en: 'My KPIs', kk: 'Менің KPI' },
    settings: { ru: 'Профиль', en: 'Profile', kk: 'Профиль' },
    quoteOfTheDay: { ru: 'Совет дня', en: 'Advice of the Day', kk: 'Күн кеңесі' },
    share: { ru: 'Питч', en: 'Pitch', kk: 'Питч' },
    currentGoal: { ru: 'Фокус недели', en: 'Weekly Focus', kk: 'Апталық фокус' },
    updateGoal: { ru: 'Изменить цель', en: 'Change Goal', kk: 'Мақсатты өзгерту' },
    deadline: { ru: 'Срок', en: 'Deadline', kk: 'Мерзімі' },
    choosePersona: { ru: 'Роль ментора', en: 'Mentor Role', kk: 'Ментор рөлі' },
    notifications: { ru: 'События', en: 'Events', kk: 'Оқиғалар' },
    save: { ru: 'Применить', en: 'Apply', kk: 'Қолдану' },

    // AiMentorPage.tsx
    mentorGreeting: { ru: 'Привет! Я KazAI коуч. Готов помочь тебе с развитием твоего продукта. Какой вопрос разберем?', en: 'Hi! I am your KazAI coach. Ready to help you grow your product. What should we tackle today?', kk: 'Сәлем! Мен KazAI коучпін. Сенің өніміңді дамытуға көмектесуге дайынмын. Қандай мәселені талқылаймыз?' },
    mentorError: { ru: 'Ошибка связи с сервером. Повтори запрос.', en: 'Connection error. Please retry.', kk: 'Сервермен байланыс қатесі. Қайталаңыз.' },
    aiMode: { ru: 'Режим анализа', en: 'Analysis Mode', kk: 'Талдау режимі' },
    modeFast: { ru: 'Быстрый', en: 'Fast', kk: 'Жылдам' },
    modeThinking: { ru: 'Глубокий', en: 'Deep', kk: 'Терең' },
    placeholderComplex: { ru: 'Опишите архитектуру или стратегию...', en: 'Describe architecture or strategy...', kk: 'Архитектураны немесе стратегияны сипаттаңыз...' },
    placeholderSimple: { ru: 'Задайте вопрос...', en: 'Ask a question...', kk: 'Сұрақ қойыңыз...' },
    thinkingMessage: { ru: 'Идет генерация...', en: 'Generating...', kk: 'Генерациялануда...' },

    // StartupPlannerPage.tsx
    plannerTitle: { ru: 'KazAI Стратег', en: 'KazAI Strategist', kk: 'KazAI Стратегі' },
    plannerDescription: { ru: 'ИИ сформирует подробную дорожную карту развития вашего проекта.', en: 'AI will create a detailed roadmap for your project development.', kk: 'AI жобаңызды дамытудың егжей-тегжейлі жол картасын жасайды.' },
    plannerPlaceholder: { ru: 'Опишите проблему и ваше решение...', en: 'Describe the problem and your solution...', kk: 'Мәселені және оны шешу жолын сипаттаңыз...' },
    generatePlan: { ru: 'Создать Roadmap', en: 'Create Roadmap', kk: 'Жол картасын жасау' },
    generatingPlan: { ru: 'Анализируем рынок...', en: 'Analyzing market...', kk: 'Нарықты талдау...' },
    ideaRequiredError: { ru: 'Введите описание идеи.', en: 'Enter idea description.', kk: 'Идея сипаттамасын енгізіңіз.' },
    planGenerationError: { ru: 'Ошибка генерации. Попробуйте короче.', en: 'Generation error. Try shorter.', kk: 'Генерация қатесі. Қысқаша көріңіз.' },
    yourBusinessPlan: { ru: 'Дорожная карта проекта', en: 'Project Roadmap', kk: 'Жобаның жол картасы' },

    // CommunityPage.tsx
    communityTitle: { ru: 'KazAI Networking', en: 'KazAI Networking', kk: 'KazAI Networking' },
    shareIdeaPlaceholder: { ru: 'Запости свой питч...', en: 'Post your pitch...', kk: 'Питчіңді жарияла...' },
    publish: { ru: 'Опубликовать', en: 'Publish', kk: 'Жариялау' },
    you: { ru: 'Вы', en: 'You', kk: 'Сіз' },

    // CoursesPage.tsx
    coursesTitle: { ru: 'KazAI Академия', en: 'KazAI Academy', kk: 'KazAI Академиясы' },
    xp: { ru: 'Очки', en: 'Points', kk: 'Ұпайлар' },
    enrolled: { ru: 'Активен', en: 'Active', kk: 'Белсенді' },
    notEnrolled: { ru: 'Доступен', en: 'Available', kk: 'Қолжетімді' },
    backToCourses: { ru: 'К списку треков', en: 'Back to Tracks', kk: 'Тректер тізіміне' },
    lessons: { ru: 'Модули', en: 'Modules', kk: 'Модульдер' },
    yourProgress: { ru: 'Ваш прогресс', en: 'Your Progress', kk: 'Сіздің үлгеріміңіз' },
    of: { ru: 'из', en: 'of', kk: '/' },
    lessonsCompleted: { ru: 'модулей пройдено', en: 'modules completed', kk: 'модуль аяқталды' },
    unenroll: { ru: 'Отказаться', en: 'Drop', kk: 'Бас тарту' },
    enroll: { ru: 'Начать обучение', en: 'Start Learning', kk: 'Оқуды бастау' },
    completeLesson: { ru: 'Пройти:', en: 'Complete:', kk: 'Өту:' },
    courseCompleted: { ru: 'Трек завершен!', en: 'Track Completed!', kk: 'Трек аяқталды!' },
};

export default strings;
