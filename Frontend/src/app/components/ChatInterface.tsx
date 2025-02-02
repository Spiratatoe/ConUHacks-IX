"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Message {
    content: string;
    sender: 'user' | 'ai';
}

const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocket('ws://localhost:3002');

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            const aiMessage: Message = {
                content: event.data,
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsLoading(false);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(ws);

        // Cleanup function to close WebSocket when component unmounts
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || !socket) return;

        // Add user message
        const userMessage: Message = {
            content: inputMessage,
            sender: 'user'
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        // Send message through WebSocket
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(inputMessage);
        } else {
            console.error('WebSocket is not connected');
            setIsLoading(false);
        }
    };

    const handleBackToDashboard = () => {
        // Close WebSocket connection if it's open
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 overflow-hidden">
            {/* Back to Dashboard button */}
            <Link
                href="/dashboard"
                onClick={handleBackToDashboard}
                className="fixed top-4 left-4 w-48 px-4 py-2 text-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
            >
                Back to Dashboard
            </Link>

            <div className="w-full max-w-2xl h-full max-h-screen md:h-[600px] overflow-hidden rounded-none md:rounded-2xl border border-gray-100 shadow-xl bg-white">
                {/* Header */}
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-4 sm:px-16">
                    <h3 className="text-xl font-semibold">AI Assistant</h3>
                    <p className="text-sm text-gray-500">Chat with our AI assistant</p>
                </div>

                {/* Chat Messages */}
                <div className="flex flex-col flex-grow h-[calc(100%-200px)] overflow-y-auto bg-gray-50 px-4 py-4 sm:px-16">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                        >
                            <div
                                className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${
                                    message.sender === 'user'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-900'
                                }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start mb-4">
                            <div className="bg-gray-200 text-gray-900 rounded-lg px-4 py-2">
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white px-4 py-4 sm:px-16">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black text-sm"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 2L11 13"></path>
                                <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;