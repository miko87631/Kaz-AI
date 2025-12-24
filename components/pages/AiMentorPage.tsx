
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Cpu, Zap, Loader, ShieldCheck, Target } from 'lucide-react';
import { generateChatResponse } from '../../services/geminiService';
import { ChatMessage } from '../../types';
import ChatMessageBubble from '../ui/ChatMessageBubble';
import SafeButton from '../ui/SafeButton';
import { useAppContext } from '../../contexts/AppContext';

const AiMentorPage: React.FC = () => {
  const { language, strings } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: strings.mentorGreeting[language] },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    setMessages(currentMessages => {
        if(currentMessages.length === 1 && currentMessages[0].role === 'model') {
            return [{ role: 'model', text: strings.mentorGreeting[language] }];
        }
        return currentMessages;
    })
  }, [language, strings.mentorGreeting]);

  const handleSend = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'model', text: '', isThinking: true }]);
    
    try {
      const history = messages.filter(m => !m.isThinking);
      const response = await generateChatResponse(history, newUserMessage.text, isThinkingMode);
      
      // Sanitization: Ensure no markdown characters leaked if the model failed to follow instructions
      const sanitizedText = response.text?.replace(/[*#_]{1,}/g, '') || '';
      const modelResponse: ChatMessage = { role: 'model', text: sanitizedText };
      
      setMessages(prev => {
        const newMessages = [...prev];
        const thinkingMessageIndex = newMessages.findIndex(m => m.isThinking);
        if (thinkingMessageIndex !== -1) {
          newMessages[thinkingMessageIndex] = modelResponse;
        }
        return newMessages;
      });

    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = { role: 'model', text: strings.mentorError[language] };
       setMessages(prev => {
        const newMessages = [...prev];
        const thinkingMessageIndex = newMessages.findIndex(m => m.isThinking);
        if (thinkingMessageIndex !== -1) {
          newMessages[thinkingMessageIndex] = errorMessage;
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, isThinkingMode, language, strings]);
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-light-bg dark:bg-dark-bg">
      {/* --- Mode Indicator --- */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
         <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-brand-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{strings.aiMode[language]}</span>
         </div>
         <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
            <button 
                onClick={() => setIsThinkingMode(false)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${!isThinkingMode ? 'bg-white dark:bg-gray-700 text-brand-primary shadow-sm' : 'text-gray-400'}`}
            >
                <Zap size={12} fill={!isThinkingMode ? "currentColor" : "none"} />
                <span>{strings.modeFast[language]}</span>
            </button>
            <button 
                onClick={() => setIsThinkingMode(true)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${isThinkingMode ? 'bg-white dark:bg-gray-700 text-brand-primary shadow-sm' : 'text-gray-400'}`}
            >
                <Cpu size={12} fill={isThinkingMode ? "currentColor" : "none"} />
                <span>{strings.modeThinking[language]}</span>
            </button>
         </div>
      </div>

      {/* --- Chat Content --- */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {messages.map((msg, index) => (
          <ChatMessageBubble key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* --- Input Area --- */}
      <div className="p-4 bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-800">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isThinkingMode ? strings.placeholderComplex[language] : strings.placeholderSimple[language]}
            className="w-full p-4 pr-14 rounded-2xl bg-gray-50 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-dark-card focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 text-sm shadow-inner"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
             <SafeButton
                onPressedAsync={handleSend}
                className="bg-brand-primary text-white rounded-xl p-2.5 hover:shadow-lg hover:shadow-brand-primary/30 transition-all disabled:bg-gray-300 active:scale-90"
                disabled={isLoading || !input.trim()}
             >
                 {isLoading ? <Loader className="animate-spin" size={18} /> : <Send size={18} />}
             </SafeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiMentorPage;
