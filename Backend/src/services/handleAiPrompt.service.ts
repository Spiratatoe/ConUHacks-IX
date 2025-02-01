import { WebSocket } from 'ws';
import ollama, { ChatRequest, ChatResponse, Message } from 'ollama';

export const handleAiPrompt = async (ws: WebSocket, message: string, chatHistory: any[]) => {
  chatHistory.push({ role: 'user', content: message });

  console.log(chatHistory);

  try {
    const response: ChatResponse = await ollama.chat({
      model: 'llama3.2:1b',
      messages: chatHistory,
    });
    
    chatHistory.push({ role: 'assistant', content: response.message.content });
    ws.send(response.message.content);
  } catch (error) {
    console.error('Error communicating with Ollama API:', error);
    ws.send('Error processing your request.');
  }
};