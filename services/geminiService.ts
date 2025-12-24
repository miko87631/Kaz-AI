
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getMockResponse = (prompt: string) => {
    return new Promise<GenerateContentResponse>(resolve => setTimeout(() => resolve({
        text: `Это имитация ответа для вашего запроса: "${prompt}". Настройте API ключ для получения реальных советов от KazAI.`,
        candidates: [],
        functionCalls: [],
    }), 500));
};

export const generateChatResponse = async (history: ChatMessage[], newMessage: string, isThinkingMode: boolean): Promise<GenerateContentResponse> => {
  if (!API_KEY) {
    return getMockResponse(newMessage);
  }

  const modelName = isThinkingMode ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
  
  // Strict formatting rules in system instruction
  const systemInstruction = `Ты - экспертный ментор в KazAI. 
  Твоя задача: помогать пользователям развивать их стартапы и изучать ИИ.
  
  ПРАВИЛА ОФОРМЛЕНИЯ ОТВЕТА:
  - НИКОГДА не используй Markdown.
  - НИКОГДА не используй символы *, **, _, __, #.
  - НЕ выделяй текст жирным или курсивом.
  - Используй только обычный текст.
  - Списки оформляй ТОЛЬКО цифрами (1., 2., 3.) или дефисами (-).
  - Твой ответ должен быть чистым текстом, который легко читается без спецсимволов.`;

  const contents = [
      ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }],
      })),
      { role: 'user', parts: [{ text: newMessage }] }
  ];

  try {
    const config: any = {
      systemInstruction,
    };
    
    if (isThinkingMode) {
      config.thinkingConfig = { thinkingBudget: 32768 };
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents as any,
      config,
    });
    return response;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw error;
  }
};


export const generateStartupPlan = async (idea: string): Promise<GenerateContentResponse> => {
    if (!API_KEY) {
        return getMockResponse(`Сгенерировать план для: ${idea}`);
    }

    const systemInstruction = `Ты - ведущий стратег венчурного фонда. 
    Создай Actionable Roadmap для этого стартапа через платформу KazAI.
    ФОРМАТ ОТВЕТА:
    Используй ТОЛЬКО обычный текст и простые списки.
    Разделы:
    1. Суть продукта (коротко)
    2. Целевая аудитория
    3. План выхода на рынок (GTM)
    4. Монетизация
    5. Риски и SWOT
    
    НИКАКОГО Markdown (без звезд, решеток и подчеркиваний).`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: idea,
            config: {
                systemInstruction,
                thinkingConfig: { thinkingBudget: 16384 }
            }
        });
        return response;
    } catch (error) {
        console.error("Gemini API call for startup plan failed:", error);
        throw error;
    }
}
