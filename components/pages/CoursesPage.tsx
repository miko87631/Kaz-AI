
import React, { useState, useEffect, useCallback } from 'react';
import { getCourses } from '../../data/i18n-courses';
import { Course } from '../../types';
import CourseDetailPage from './CourseDetailPage';
import { useAppContext } from '../../contexts/AppContext';

interface CourseCardProps {
    course: Course;
    onSelect: (course: Course) => void;
    progress: number;
    isEnrolled: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, progress, isEnrolled }) => {
    const { language, strings } = useAppContext();
    const progressPercentage = isEnrolled && course.lessons.length > 0 ? (progress / course.lessons.length) * 100 : 0;
    
    return (
        <div className="bg-light-card dark:bg-dark-card p-5 rounded-2xl border border-gray-100 dark:border-gray-900 shadow-md transition-all hover:scale-[1.02] duration-300 flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 h-12 flex-grow text-sm">{course.description}</p>
            {isEnrolled && (
                 <div className="w-full bg-gray-200 dark:bg-gray-900 rounded-full h-2 mb-4">
                    <div className="bg-brand-primary h-2 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.4)]" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            )}
            <div className="flex justify-between items-center mt-auto">
                 <span className={`text-[10px] font-bold uppercase tracking-widest ${isEnrolled ? 'text-green-500' : 'text-gray-400'}`}>
                    {isEnrolled ? strings.enrolled[language] : strings.notEnrolled[language]}
                </span>
                <button
                    onClick={() => onSelect(course)}
                    className="bg-brand-primary text-white font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-widest transition hover:opacity-90 shadow-lg shadow-brand-primary/20 active:scale-95"
                >
                    {strings.details[language]}
                </button>
            </div>
        </div>
    );
};


const CoursesPage: React.FC = () => {
    const { language, strings } = useAppContext();
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
    const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});
    const [xp, setXp] = useState<number>(0);

    useEffect(() => {
        setCourses(getCourses(language));
    }, [language]);
    
    // Load data from localStorage on mount
    useEffect(() => {
        try {
            const storedEnrolled = localStorage.getItem('enrolled_courses');
            if (storedEnrolled) setEnrolledCourses(JSON.parse(storedEnrolled));

            const storedProgress = localStorage.getItem('course_progress');
            if (storedProgress) setCourseProgress(JSON.parse(storedProgress));

            const storedXp = localStorage.getItem('xp');
            if (storedXp) setXp(parseInt(storedXp, 10));
        } catch (error) {
            console.error("Failed to parse from localStorage", error);
        }
    }, []);
    
    const updateEnrolledCourses = useCallback((newEnrolled: string[]) => {
        setEnrolledCourses(newEnrolled);
        localStorage.setItem('enrolled_courses', JSON.stringify(newEnrolled));
    }, []);
    
    const updateCourseProgress = useCallback((newProgress: Record<string, number>) => {
        setCourseProgress(newProgress);
        localStorage.setItem('course_progress', JSON.stringify(newProgress));
    }, []);

    const updateXp = useCallback((newXp: number) => {
        setXp(newXp);
        localStorage.setItem('xp', newXp.toString());
    }, []);


    const handleSelectCourse = (course: Course) => {
        setSelectedCourse(course);
    };

    const handleBackToList = () => {
        setSelectedCourse(null);
    };
    
    if (selectedCourse) {
        // Find the latest version of the selected course by ID, in case the language changed
        const currentCourseData = courses.find(c => c.id === selectedCourse.id) || selectedCourse;
        return <CourseDetailPage 
            course={currentCourseData} 
            onBack={handleBackToList}
            enrolledCourses={enrolledCourses}
            courseProgress={courseProgress}
            xp={xp}
            updateEnrolledCourses={updateEnrolledCourses}
            updateCourseProgress={updateCourseProgress}
            updateXp={updateXp}
        />
    }

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight">{strings.coursesTitle[language]}</h2>
                <div className="bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 rounded-full">
                    <p className="font-bold text-brand-primary text-sm uppercase tracking-widest">{strings.xp[language]}: {xp}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                {courses.map(course => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onSelect={handleSelectCourse}
                        isEnrolled={enrolledCourses.includes(course.id)}
                        progress={courseProgress[course.id] || 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
