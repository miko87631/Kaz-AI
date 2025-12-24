
import React from 'react';
import { User, Bot, Loader, Sparkles } from 'lucide-react';
import { ChatMessage } from '../../types';
import { useAppContext } from '../../contexts/AppContext';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const { language, strings } = useAppContext();
  const isUser = message.role === 'user';

  if (message.isThinking) {
    return (
        <div className={`flex items-start gap-3 animate-pulse`}>
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center border border-brand-primary/20">
                <Sparkles size={18} />
            </div>
            <div className="bg-light-card dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm max-w-xs md:max-w-md">
               <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                  <Loader className="animate-spin text-brand-primary" size={16}/>
                  <span className="text-xs font-bold uppercase tracking-widest">{strings.thinkingMessage[language]}</span>
               </div>
            </div>
        </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser ? (
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/20">
          <Bot size={18} />
        </div>
      ) : (
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center">
          <User size={18} />
        </div>
      )}
      <div
        className={`rounded-2xl px-4 py-3 shadow-sm max-w-[85%] md:max-w-lg ${
          isUser
            ? 'bg-brand-primary text-white rounded-tr-none'
            : 'bg-light-card dark:bg-dark-card text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-800'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
