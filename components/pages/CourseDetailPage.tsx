
import React from 'react';
import { Course } from '../../types';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import SafeButton from '../ui/SafeButton';
import { useAppContext } from '../../contexts/AppContext';

interface CourseDetailPageProps {
    course: Course;
    onBack: () => void;
    enrolledCourses: string[];
    courseProgress: Record<string, number>;
    xp: number;
    updateEnrolledCourses: (newEnrolled: string[]) => void;
    updateCourseProgress: (newProgress: Record<string, number>) => void;
    updateXp: (newXp: number) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ 
    course, 
    onBack,
    enrolledCourses,
    courseProgress,
    xp,
    updateEnrolledCourses,
    updateCourseProgress,
    updateXp
}) => {
    const { language, strings } = useAppContext();
    const isEnrolled = enrolledCourses.includes(course.id);
    const completedLessons = courseProgress[course.id] || 0;
    const progressPercentage = course.lessons.length > 0 ? (completedLessons / course.lessons.length) * 100 : 0;

    const handleEnrollToggle = async () => {
        if (isEnrolled) {
            const newEnrolled = enrolledCourses.filter(id => id !== course.id);
            updateEnrolledCourses(newEnrolled);
        } else {
            updateEnrolledCourses([...enrolledCourses, course.id]);
        }
    };
    
    const handleCompleteLesson = async () => {
        if (isEnrolled && completedLessons < course.lessons.length) {
            const newProgress = completedLessons + 1;
            updateCourseProgress({
                ...courseProgress,
                [course.id]: newProgress
            });
            updateXp(xp + 10);
        }
    };
    
    const nextLessonIndex = completedLessons;

    const progressText = language === 'kk' 
        ? `${course.lessons.length} ${strings.of[language]} ${completedLessons} ${strings.lessonsCompleted[language]}`
        : `${completedLessons} ${strings.of[language]} ${course.lessons.length} ${strings.lessonsCompleted[language]}`;


    return (
        <div className="p-4 space-y-6">
            <button onClick={onBack} className="flex items-center text-brand-primary font-bold uppercase tracking-widest text-xs hover:underline mb-4">
                <ArrowLeft size={16} className="mr-2"/>
                {strings.backToCourses[language]}
            </button>

            <div className="bg-light-card dark:bg-dark-card p-6 rounded-3xl border border-gray-100 dark:border-gray-900 shadow-xl">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">{course.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{course.fullDescription}</p>

                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{strings.lessons[language]}</h3>
                <ul className="space-y-3 mb-8">
                    {course.lessons.map((lesson, index) => (
                        <li key={lesson.id} className="flex items-center p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-transparent dark:border-gray-900">
                             {index < completedLessons ? (
                                <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />
                            ) : (
                                <Circle size={20} className="text-gray-400 mr-3 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${index < completedLessons ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200 font-medium'}`}>{lesson.title}</span>
                        </li>
                    ))}
                </ul>

                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{strings.yourProgress[language]}</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-900 rounded-full h-5 mb-3 relative overflow-hidden">
                    <div className="bg-brand-primary h-full rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]" style={{ width: `${progressPercentage}%` }}>
                       <span className="text-white text-[10px] font-black absolute left-1/2 -translate-x-1/2 uppercase">{Math.round(progressPercentage)}%</span>
                    </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-center text-gray-500 mb-8">{progressText}</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <SafeButton
                        onPressedAsync={handleEnrollToggle}
                        className={`w-full font-bold py-4 px-6 rounded-2xl transition-all text-[10px] uppercase tracking-[0.2em] text-center ${isEnrolled ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500 text-white shadow-lg shadow-green-500/20'}`}
                    >
                        {isEnrolled ? strings.unenroll[language] : strings.enroll[language]}
                    </SafeButton>

                    <SafeButton
                        onPressedAsync={handleCompleteLesson}
                        disabled={!isEnrolled || completedLessons >= course.lessons.length}
                        className="w-full bg-brand-primary text-white font-bold py-4 px-6 rounded-2xl transition-all hover:opacity-90 shadow-lg shadow-brand-primary/30 disabled:bg-gray-500 disabled:shadow-none disabled:cursor-not-allowed text-[10px] uppercase tracking-[0.2em] text-center"
                    >
                        {(isEnrolled && completedLessons < course.lessons.length) ? `${strings.completeLesson[language]} "${course.lessons[nextLessonIndex].title}"` : strings.courseCompleted[language]}
                    </SafeButton>
                </div>

            </div>
        </div>
    );
};

export default CourseDetailPage;
