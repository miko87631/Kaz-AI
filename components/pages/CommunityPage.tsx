
import React, { useState } from 'react';
import { Heart, MessageCircle, Plus } from 'lucide-react';
import { CommunityPost } from '../../types';
import { useAppContext } from '../../contexts/AppContext';

const initialPosts: CommunityPost[] = [
    { id: 1, author: 'Nikita', idea: 'An AI assistant for freelancers to manage projects and invoices.', likes: 42, comments: 5 },
    { id: 2, author: 'Alina', idea: 'A platform that uses AI to create personalized travel itineraries.', likes: 112, comments: 19 },
    { id: 3, author: 'Dmitry', idea: 'Sustainable packaging solutions using biodegradable materials discovered by AI.', likes: 78, comments: 12 },
];

const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
  <div className="bg-light-card dark:bg-dark-card p-5 rounded-3xl border border-gray-100 dark:border-gray-900 shadow-sm transition-all hover:scale-[1.01] duration-300">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary mb-3">{post.author}</p>
    <p className="text-gray-800 dark:text-gray-200 mb-6 leading-relaxed font-medium">{post.idea}</p>
    <div className="flex items-center text-gray-500 dark:text-gray-500">
      <button className="flex items-center mr-6 hover:text-brand-primary transition-colors text-xs font-bold uppercase tracking-widest">
        <Heart size={16} className="mr-2"/> {post.likes}
      </button>
      <button className="flex items-center hover:text-brand-primary transition-colors text-xs font-bold uppercase tracking-widest">
        <MessageCircle size={16} className="mr-2"/> {post.comments}
      </button>
    </div>
  </div>
);

const CommunityPage: React.FC = () => {
    const { language, strings } = useAppContext();
    const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
    const [newIdea, setNewIdea] = useState('');

    const handlePublish = () => {
        if (!newIdea.trim()) return;
        const newPost: CommunityPost = {
            id: Date.now(),
            author: strings.you[language],
            idea: newIdea.trim(),
            likes: 0,
            comments: 0,
        };
        setPosts([newPost, ...posts]);
        setNewIdea('');
    };
    
    return (
        <div className="p-4 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center uppercase tracking-tight">{strings.communityTitle[language]}</h2>
            
            <div className="bg-light-card dark:bg-dark-card p-5 rounded-3xl border border-gray-100 dark:border-gray-900 shadow-lg">
                <textarea
                    value={newIdea}
                    onChange={(e) => setNewIdea(e.target.value)}
                    placeholder={strings.shareIdeaPlaceholder[language]}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:outline-none resize-none min-h-[120px] text-sm shadow-inner"
                />
                <button
                    onClick={handlePublish}
                    className="w-full mt-4 bg-brand-primary text-white font-bold py-4 px-4 rounded-2xl flex items-center justify-center transition hover:opacity-90 shadow-lg shadow-brand-primary/25 active:scale-95 text-[10px] uppercase tracking-[0.2em]"
                >
                    <Plus size={18} className="mr-2"/> {strings.publish[language]}
                </button>
            </div>
            
            <div className="space-y-4 pb-12">
                {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
        </div>
    );
};

export default CommunityPage;
