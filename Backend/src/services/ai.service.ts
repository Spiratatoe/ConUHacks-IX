import { WebSocket } from 'ws';
import ollama, { ChatRequest, ChatResponse, Message } from 'ollama';
import { tipOfTheDayPrompt } from './AiPromptRestrictions';

const model = 'llama3.2:1b';
// const model = 'qwen2.5:1.5b';

export const handleAiPrompt = async (ws: WebSocket, message: string, chatHistory: any[]) => {
  chatHistory.push({ role: 'user', content: message });

  try {
    const response: ChatResponse = await ollama.chat({
      model,
      messages: chatHistory,
    });
    
    chatHistory.push({ role: 'assistant', content: response.message.content });
    ws.send(response.message.content);
  } catch (error) {
    console.error('Error communicating with Ollama API:', error);
    ws.send('Error processing your request.');
  }
};

export const tipOfTheDay = async () => {
  const response: ChatResponse = await ollama.chat({
    model,
    messages: [{ 'role': 'system', 'content': tipOfTheDayPrompt }],
  });

  const result = response.message.content;

  const extractedContent = result.match(/"(.*?)"/)?.[1];
  return extractedContent;
 }