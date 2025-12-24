
import React, { useState } from 'react';
import SafeButton from '../ui/SafeButton';
import { generateStartupPlan } from '../../services/geminiService';
import { Rocket, Loader, CheckCircle2, ListChecks, Map } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const StartupPlannerPage: React.FC = () => {
    const { language, strings } = useAppContext();
    const [idea, setIdea] = useState('');
    const [plan, setPlan] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGeneratePlan = async () => {
        if (!idea.trim()) {
            setError(strings.ideaRequiredError[language]);
            return;
        }
        setIsLoading(true);
        setError('');
        setPlan('');

        try {
            const response = await generateStartupPlan(idea);
            // Sanitization to ensure NO markdown symbols appear
            const cleanText = response.text?.replace(/[*#_]{1,}/g, '') || '';
            setPlan(cleanText);
        } catch (err) {
            setError(strings.planGenerationError[language]);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-brand-primary/10 rounded-2xl text-brand-primary mb-2">
                    <Rocket size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">{strings.plannerTitle[language]}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{strings.plannerDescription[language]}</p>
            </div>

            <div className="bg-light-card dark:bg-dark-card p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder={strings.plannerPlaceholder[language]}
                    className="w-full h-36 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border-none focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none text-sm placeholder:italic shadow-inner"
                    disabled={isLoading}
                />
                <div className="mt-5">
                    <SafeButton
                        onPressedAsync={handleGeneratePlan}
                        className="w-full bg-brand-primary text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-brand-primary/25 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center text-sm uppercase tracking-widest disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="animate-spin mr-3" size={18} />
                                {strings.generatingPlan[language]}
                            </>
                        ) : (
                            <>
                                <Map className="mr-3" size={18} />
                                {strings.generatePlan[language]}
                            </>
                        )}
                    </SafeButton>
                </div>
                {error && <p className="text-red-500 mt-4 text-center text-xs font-bold">{error}</p>}
            </div>

            {plan && (
                 <div className="bg-light-card dark:bg-dark-card p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-gray-50 dark:border-gray-900">
                        <ListChecks className="text-brand-primary" size={24} />
                        <h3 className="text-xl font-bold">{strings.yourBusinessPlan[language]}</h3>
                    </div>
                     <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {plan}
                     </div>
                     <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-900 flex justify-center">
                        <button className="flex items-center space-x-2 text-brand-primary text-xs font-bold uppercase tracking-widest hover:underline">
                            <CheckCircle2 size={16} />
                            <span>Добавить в мои цели</span>
                        </button>
                     </div>
                 </div>
            )}
        </div>
    );
};

export default StartupPlannerPage;
