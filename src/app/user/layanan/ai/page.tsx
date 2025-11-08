/**
 * HaritaAI Chatbot Template
 * Fix: Changed model name to the stable 'gemini-2.5-flash'.
 */
'use client';

import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Send, User, Bot, Copy, MessageCircle } from 'lucide-react';

// Hardcoded System Prompt (Replaces './prompt' for self-contained code)
const SYSTEM_PROMPT =
  'Anda adalah HaritaAI, asisten AI yang ramah, profesional, dan informatif. Berikan jawaban yang akurat dan relevan dalam Bahasa Indonesia.';

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
      content:
        'Halo! Saya HaritaAI, siap menjawab pertanyaan Anda. Saya didukung oleh Google Gemini.',
      timestamp: new Date().toISOString(),
    },
  ],
  botName = 'HaritaAI',
  botDescription = 'Powered by Google Gemini',
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ✅ FIXED: Menggunakan nama model yang paling stabil dan umum
  const API_KEY = ''; 
  const MODEL_NAME = 'gemini-2.5-flash'; 

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log('Gemini API is ready with model:', MODEL_NAME);
  }, []);

  // Fungsi untuk parse markdown sederhana
  const parseMarkdown = (text: string): string => {
    return text
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>'); // Preserve new lines
  };

  // Fungsi yang diperbaiki untuk call API dengan format multi-turn yang benar
  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    try {
      console.log(' Mengirim request ke Gemini API dengan model:', MODEL_NAME);

      // 1. Buat Riwayat Percakapan (Contents Array)
      const chatHistory = messages
        .slice(-10) // Ambil 10 pesan terakhir untuk konteks
        .map((msg) => ({
          role: msg.type === 'user' ? 'user' : 'model', 
          parts: [{ text: msg.content }],
        }));

      // 2. Tambahkan pesan user saat ini
      chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });

      // Body request
      const requestBody = {
        contents: chatHistory, 
        systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
        },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      };

      // URL API menggunakan nama model yang baru (gemini-2.5-flash)
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

      // Fetch ke Gemini
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      console.log(' Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error:', errorText);
        throw new Error(
          `Gemini API error ${response.status}: ${
            errorText || 'Unknown error'
          }`,
        );
      }

      const data = await response.json();
      console.log(' Gemini Response JSON:', data);

      // Ambil teks respons
      const text =
        data?.candidates?.[0]?.content?.parts
          ?.map((p: any) => p.text || '')
          .join(' ')
          .trim() || '';

      if (!text) {
        const blockReason = data?.candidates?.[0]?.finishReason;
        if (blockReason) {
            return `Maaf, respons AI diblokir karena alasan: ${blockReason}. Coba formulasi ulang pertanyaan Anda.`;
        }
        return 'Maaf, saya tidak bisa memberikan respons saat ini. (No text output)';
      }

      console.log(' Respons berhasil:', text);
      return text;
    } catch (err) {
      console.error('Gemini API Error:', err);
      const errorMessage = (err as Error).message || 'Terjadi kesalahan saat menghubungi AI. Silakan coba lagi.';
      return errorMessage.includes('404') 
        ? 'Error Model: Model tidak ditemukan. Harap hubungi penyedia layanan.' 
        : errorMessage;
    }
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      let aiResponseContent: string;

      if (onSendMessage) {
        aiResponseContent = await onSendMessage(currentMessage);
      } else {
        aiResponseContent = await callGeminiAPI(currentMessage);
      }

      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponseContent,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content:
          'Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi dalam beberapa saat.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
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
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
  };

  const copyToClipboard = (text: string): void => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log('Text copied to clipboard');
  };

  const formatTime = (timestamp: string): string => {
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-green-50 to-green-100 font-sans">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-green-200 bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-700 shadow-lg">
              <MessageCircle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-900">{botName}</h1>
              <p className="text-sm font-medium text-green-600">
                {botDescription}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">
            <div
              className={`h-2 w-2 rounded-full animate-pulse bg-green-500`}
            ></div>
            <span className="text-xs font-medium text-green-700">
              Online
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-6 flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex w-full max-w-4xl ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              } gap-4`}
            >
              {/* Avatar */}
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                  message.type === 'user'
                    ? 'bg-green-800 shadow-lg'
                    : 'bg-gradient-to-r from-green-500 to-green-700 shadow-lg'
                }`}
              >
                {message.type === 'user' ? (
                  <User className="h-6 w-6 text-white" />
                ) : (
                  <Bot className="h-6 w-6 text-white" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`group flex flex-col ${
                  message.type === 'user' ? 'items-end' : 'items-start'
                } min-w-0 flex-1`}
              >
                <div
                  className={`relative rounded-2xl px-5 py-4 ${
                    message.type === 'user'
                      ? 'max-w-2xl break-words bg-green-800 text-white shadow-lg'
                      : 'max-w-2xl border border-green-200 bg-white text-green-900 shadow-sm'
                  }`}
                >
                  <div
                    className="whitespace-pre-wrap break-words text-base leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(message.content),
                    }}
                  />
                </div>

                {/* Actions */}
                <div
                  className={`mt-2 flex items-center gap-2 ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <span className="text-xs font-semibold text-green-600">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.type === 'ai' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="rounded-lg p-1.5 text-green-500 transition-all hover:bg-green-100 hover:text-green-700"
                        title="Salin pesan"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="mb-6 flex justify-start">
            <div className="flex w-full max-w-4xl gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-700 shadow-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-white px-5 py-4 shadow-sm">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-green-500"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-green-500"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-green-500"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
                <span className="text-sm text-green-600">
                  Sedang mengetik...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-green-200 bg-white px-6 py-5">
        <div className="relative max-w-4xl">
          <div className="flex items-end gap-3 rounded-2xl border-2 border-green-200 bg-green-50 shadow-sm transition-all focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan Anda di sini..."
              className="bg-transparent max-h-32 min-h-[20px] flex-1 resize-none rounded-2xl px-5 py-4 leading-relaxed text-green-900 placeholder-green-500 focus:outline-none"
              rows={1}
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className={`m-2 flex-shrink-0 rounded-xl p-3 transition-all ${
                inputMessage.trim() && !isTyping
                  ? 'bg-green-600 text-white shadow-lg hover:scale-105 hover:bg-green-700'
                  : 'cursor-not-allowed bg-green-300 text-green-500'
              }`}
              title={'Kirim pesan'}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs font-medium text-green-600">
            Tekan Enter untuk mengirim, Shift + Enter untuk baris baru
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBotTemplate;