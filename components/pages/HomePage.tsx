
import React, { useState, useEffect } from 'react';
import { Page, Course, NewsItem, Goal, Persona } from '../../types';
import SafeButton from '../ui/SafeButton';
import { 
    User, GraduationCap, Bot, MessageSquare, 
    Edit, CheckCircle, Clock, Loader, Award, Newspaper, Rocket, Target, Briefcase, Code, Palette
} from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { getCourses } from '../../data/i18n-courses';

const mockUser = { username: 'Founder', level: 'Seed', xp: 720, totalXpForLevel: 1000 };

const mockNews: NewsItem[] = [
    { id: 1, icon: Award, text: 'Гранты до $50k для AI-стартапов открыты до конца месяца.'},
    { id: 2, icon: Newspaper, text: 'Вышло обновление Gemini 3.0: новые возможности для B2B.'},
    { id: 3, icon: Target, text: 'Завтра: Демо-день для инвесторов из Кремниевой долины.'},
];

const mockQuote = {
    text: "Ваш бренд — это то, что говорят о вас люди, когда вас нет в комнате.",
    author: "Джефф Безос"
};

const Card: React.FC<{children: React.ReactNode, className?: string, noPadding?: boolean}> = ({ children, className, noPadding }) => (
    <div className={`bg-light-card dark:bg-dark-card ${noPadding ? '' : 'p-5'} rounded-2xl border border-gray-100 dark:border-gray-900 shadow-sm transition-all hover:shadow-md ${className}`}>
        {children}
    </div>
);

const CardTitle: React.FC<{children: React.ReactNode, icon?: React.ElementType}> = ({ children, icon: Icon }) => (
    <div className="flex items-center space-x-2 mb-4">
        {Icon && <Icon className="text-brand-primary" size={20} />}
        <h2 className="text-lg font-bold uppercase tracking-tight text-gray-900 dark:text-gray-100">{children}</h2>
    </div>
);

const HomePage: React.FC<{ setActivePage: (page: Page) => void }> = ({ setActivePage }) => {
    const { language, strings } = useAppContext();
    const [courses, setCourses] = useState<Course[]>([]);
    const [goal, setGoal] = useState<Goal>({ text: 'Провести 5 интервью с потенциальными клиентами', deadline: 'До пятницы' });
    const [selectedPersona, setSelectedPersona] = useState<Persona>('ProductManager');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const localizedCourses = getCourses(language);
        try {
            const storedProgress = localStorage.getItem('course_progress');
            if (storedProgress) {
                const progress = JSON.parse(storedProgress);
                const coursesWithProgress = localizedCourses.map(c => ({
                    ...c,
                    progress: progress[c.id] || 0
                }));
                setCourses(coursesWithProgress);
            } else {
                setCourses(localizedCourses);
            }
        } catch (error) {
            setCourses(localizedCourses);
        }
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, [language]);

    const personaIcons: Record<Persona, React.ElementType> = {
        ProductManager: Briefcase,
        VentureCapitalist: Target,
        TechLead: Code,
        UXDesigner: Palette
    };

    const QuickActionButton: React.FC<{icon: React.ElementType, labelKey: keyof typeof strings, page: Page}> = ({icon: Icon, labelKey, page}) => (
        <button onClick={() => setActivePage(page)} className="flex flex-col items-center justify-center space-y-2 p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl hover:bg-brand-primary group transition-all duration-300 transform active:scale-95 border border-transparent hover:border-brand-primary/20 shadow-sm">
            <Icon size={24} className="text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500 group-hover:text-white text-center transition-colors">{strings[labelKey][language]}</span>
        </button>
    );

    if (!isLoaded) {
        return <div className="flex items-center justify-center h-screen"><Loader className="animate-spin text-brand-primary" size={40} /></div>
    }

    return (
        <div className={`space-y-6 pb-10 transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            {/* --- User Profile Card - Updated to Orange/Black --- */}
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-primary to-orange-700 p-6 rounded-3xl text-white shadow-xl shadow-brand-primary/20">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <img src={`https://i.pravatar.cc/150?u=${mockUser.username}`} alt="avatar" className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20" />
                            <div className="absolute -bottom-1 -right-1 bg-green-400 w-4 h-4 rounded-full border-2 border-orange-700"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">{strings.welcome[language]}, {mockUser.username}</h1>
                            <p className="text-orange-100 text-sm font-medium opacity-80">{strings.level[language]}: {mockUser.level}</p>
                        </div>
                    </div>
                    <div className="flex-1 max-w-xs">
                        <div className="flex justify-between text-xs mb-1 font-bold">
                            <span>ПРОГРЕСС К MVP</span>
                            <span>{Math.round((mockUser.xp / mockUser.totalXpForLevel) * 100)}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                            <div className="bg-white h-2 rounded-full shadow-sm" style={{ width: `${(mockUser.xp / mockUser.totalXpForLevel) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full -ml-8 -mb-8 blur-xl"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <QuickActionButton icon={Bot} labelKey="askAI" page="mentor" />
                <QuickActionButton icon={Rocket} labelKey="ideaGenerator" page="planner" />
                <QuickActionButton icon={GraduationCap} labelKey="navCourses" page="courses" />
                <QuickActionButton icon={MessageSquare} labelKey="navCommunity" page="community" />
            </div>

            {/* --- AI Recommendation --- */}
            <Card className="border-l-4 border-l-brand-primary">
                <CardTitle icon={Bot}>{strings.aiRecommendation[language]}</CardTitle>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    "Твой текущий прогресс в маркетинге (3/5) опережает техническую часть. Рекомендую сфокусироваться на модуле 'MVP за 48 часов', чтобы сбалансировать развитие."
                </p>
                <div className="flex space-x-3">
                    <button onClick={() => setActivePage('mentor')} className="flex-1 bg-brand-primary text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition shadow-lg shadow-brand-primary/20">{strings.askMore[language]}</button>
                    <button className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider">{strings.showSources[language]}</button>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                 <Card>
                    <CardTitle icon={Newspaper}>{strings.newsAndEvents[language]}</CardTitle>
                    <div className="space-y-4">
                        {mockNews.map(item => (
                            <div key={item.id} className="flex items-start space-x-3 group cursor-pointer">
                                <div className="p-2 bg-gray-50 dark:bg-gray-950 rounded-lg text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                                    <item.icon size={18} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-primary transition-colors">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <CardTitle icon={Target}>{strings.currentGoal[language]}</CardTitle>
                    <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-900 shadow-inner">
                        <div className="flex items-start space-x-3">
                            <div className="mt-1"><CheckCircle className="text-green-500" size={20}/></div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-900 dark:text-gray-100 leading-tight">{goal.text}</p>
                                <p className="text-xs text-gray-500 mt-2 flex items-center font-medium">
                                    <Clock size={12} className="mr-1"/> {strings.deadline[language]}: {goal.deadline}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => {}} className="w-full mt-4 flex items-center justify-center text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-secondary transition-colors">
                        <Edit size={14} className="mr-2"/>{strings.updateGoal[language]}
                    </button>
                </Card>
            </div>

            {/* --- Persona Selector --- */}
            <div className="space-y-4">
                <CardTitle icon={User}>{strings.choosePersona[language]}</CardTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(['ProductManager', 'VentureCapitalist', 'TechLead', 'UXDesigner'] as Persona[]).map(p => {
                        const Icon = personaIcons[p];
                        return (
                            <button 
                                key={p} 
                                onClick={() => setSelectedPersona(p)} 
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all border ${selectedPersona === p ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-light-card dark:bg-dark-card border-gray-100 dark:border-gray-900 text-gray-600 dark:text-gray-400'}`}
                            >
                                <Icon size={20} className="mb-2" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{p.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <Card className="text-center bg-gray-50 dark:bg-gray-950 border-none shadow-inner">
                <div className="text-brand-primary mb-2 opacity-40"><Rocket size={40} className="mx-auto" /></div>
                <p className="text-sm font-medium italic text-gray-600 dark:text-gray-400 mb-2">"{mockQuote.text}"</p>
                <cite className="block text-xs font-bold uppercase tracking-widest text-brand-primary not-italic">— {mockQuote.author}</cite>
            </Card>

        </div>
    );
};

export default HomePage;
