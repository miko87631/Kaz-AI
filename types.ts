
import React from 'react';

export type Theme = 'light' | 'dark';

export type Page = 'home' | 'mentor' | 'planner' | 'community' | 'courses';

export type Language = 'en' | 'ru' | 'kk';

export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  strings: Record<string, Record<Language, string>>;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface CommunityPost {
  id: number;
  author: string;
  idea: string;
  likes: number;
  comments: number;
}

export interface Lesson {
  id: string;
  title: string;
}

export interface Course {
  id: string;
  title: string;
  level?: string;
  description: string;
  fullDescription: string;
  lessons: Lesson[];
  progress?: number;
}

export interface NewsItem {
  id: number;
  icon: React.ElementType;
  text: string;
}

export interface Goal {
    text: string;
    deadline: string;
}

export type Persona = 'ProductManager' | 'VentureCapitalist' | 'TechLead' | 'UXDesigner';

export type StartupStage = 'Idea' | 'MVP' | 'Seed' | 'Scale';
