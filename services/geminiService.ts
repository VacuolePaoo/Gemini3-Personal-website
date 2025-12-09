import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

const apiKey = process.env.API_KEY || '';

// Initialize client securely. 
// Note: In a real prod environment, calls might go through a proxy, 
// but for this demo, client-side direct call is acceptable per instructions.
const ai = new GoogleGenAI({ apiKey });

export const generateResponse = async (userMessage: string, history: {role: string, content: string}[] = []) => {
  try {
    // Transform history for the API
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 200, // Keep it curt
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Neural Link Failure:", error);
    return "ERROR: CONNECTION_INTERRUPTED. RETRY_HANDSHAKE.";
  }
};
