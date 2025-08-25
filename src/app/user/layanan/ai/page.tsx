"use client"

import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { Send, User, Bot, Copy, ThumbsUp, ThumbsDown, MoreHorizontal, Sparkles, MessageCircle } from 'lucide-react';

// Types
interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface ChatBotTemplateProps {
  onSendMessage?: (message: string) => Promise<string>;
  initialMessages?: Message[];
  botName?: string;
  botDescription?: string;
}

const ChatBotTemplate: React.FC<ChatBotTemplateProps> = ({
  onSendMessage,
  initialMessages = [
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ],
  botName = 'Asisten AI',
  botDescription = 'Powered by Advanced AI'
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      let aiResponseContent: string;
      
      if (onSendMessage) {
        aiResponseContent = await onSendMessage(currentMessage);
      } else {
        // Simulate AI response with different responses based on input
        await new Promise(resolve => setTimeout(resolve, 1500));
        aiResponseContent = getSimulatedResponse(currentMessage);
      }

      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponseContent,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getSimulatedResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! It\'s great to meet you. How can I assist you today?';
    } else if (lowerMessage.includes('help')) {
      return 'I\'m here to help! You can ask me questions, request information, or have a conversation. What would you like to know?';
    } else if (lowerMessage.includes('weather')) {
      return 'I don\'t have access to real-time weather data, but you can check your local weather service or weather apps for current conditions.';
    } else if (lowerMessage.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString()}.`;
    } else {
      return 'I understand your question. This is a simulated response from the AI assistant. In a real implementation, this would be connected to an actual AI service like OpenAI, Claude, or another language model.';
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputMessage(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const formatTime = (timestamp: string): string => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFeedback = (messageId: number, isPositive: boolean): void => {
    console.log(`Feedback for message ${messageId}: ${isPositive ? 'positive' : 'negative'}`);
    // Implement feedback logic here
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-green-200 shadow-sm rounded">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-900">{botName}</h1>
                <p className="text-sm text-green-600 font-medium">{botDescription}</p>
              </div>
            </div>
           
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-6 py-6 h-full">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-6 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-4xl w-full ${message.type === 'user' ? 'flex-row-reverse justify-start' : 'flex-row'} gap-4`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-green-800 shadow-lg' 
                    : 'bg-gradient-to-r from-green-500 to-green-700 shadow-lg'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-6 h-6 text-white" />
                  ) : (
                    <Bot className="w-6 h-6 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <div className={`group flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} flex-1 min-w-0`}>
                  <div className={`relative px-5 py-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-green-800 text-white shadow-lg max-w-2xl break-words'
                      : 'bg-white border border-green-200 text-green-900 shadow-sm max-w-2xl'
                  }`}>
                    <p className="text-base leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>
                  
                  {/* Message Actions */}
                  <div className={`flex items-center gap-2 mt-2 ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <span className="text-xs text-green-600 font-semibold">{formatTime(message.timestamp)}</span>
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => copyToClipboard(message.content)}
                          className="p-1.5 text-green-500 hover:text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200"
                          title="Copy message"
                          aria-label="Copy message"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleFeedback(message.id, true)}
                          className="p-1.5 text-green-500 hover:text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200"
                          title="Good response"
                          aria-label="Good response"
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleFeedback(message.id, false)}
                          className="p-1.5 text-green-500 hover:text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200"
                          title="Bad response"
                          aria-label="Bad response"
                        >
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="mb-6 flex justify-start">
              <div className="flex gap-4 max-w-4xl w-full">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white border border-green-200 rounded-2xl px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div 
                      className="w-2 h-2 bg-green-500 rounded-full animate-bounce" 
                      style={{animationDelay: '0.1s'}}
                    ></div>
                    <div 
                      className="w-2 h-2 bg-green-500 rounded-full animate-bounce" 
                      style={{animationDelay: '0.2s'}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-green-200 bg-white">
        <div className="px-6 py-5">
          <div className="relative max-w-4xl">
            <div className="flex items-end gap-3 bg-green-50 rounded-2xl border-2 border-green-200 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100 transition-all duration-200 shadow-sm">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 bg-transparent px-5 py-4 text-green-900 rounded-2xl placeholder-green-500 resize-none focus:outline-none min-h-[20px] max-h-32 leading-relaxed"
                rows={1}
                disabled={isTyping}
                aria-label="Message input"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`flex-shrink-0 m-2 p-3 rounded-xl transition-all duration-200 ${
                  inputMessage.trim() && !isTyping
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-green-300 text-green-500 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-xs text-green-600 text-left mt-3 font-medium">
            Tekan Enter untuk mengirim, tekan shift + enter untuk baris baru
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBotTemplate;