'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';



interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  displayedContent?: string;
  featureType?: 'content' | 'recommendations' | 'brand' | 'market' | 'leads' | null;
}

const ChatbotSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'Hi there! I\'m Areion\'s Business Development Assistant. How can I help you today?',
      timestamp: new Date(),
      displayedContent: 'Hi there! I\'m Areion\'s Business Development Assistant. How can I help you today?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingSpeed = 20; // milliseconds per character

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchGeminiResponse = async (prompt: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
      const apiUrl = (process.env.NEXT_PUBLIC_GEMINI_URL || '') + apiKey;

      console.log('API URL:', apiUrl); // Debug log

      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: "You are a business development assistant for Areion, a digital marketing agency. Focus your responses on business growth, marketing strategies, customer acquisition, and related topics. Keep responses concise, professional, and actionable. Limit responses to 3-4 sentences maximum. Now respond to this: " + prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      };

      console.log('Request body:', JSON.stringify(requestBody)); // Debug log

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API request failed with status ${response.status}:`, errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('API response:', data); // Debug log

      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I\'m having trouble processing your request right now.';
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      return 'I\'m sorry, I encountered an error while processing your request. Please try again later. Error: ' + (error instanceof Error ? error.message : String(error));
    }
  };

  const animateTyping = (messageIndex: number, fullText: string) => {
    let currentCharIndex = 0;
    const textLength = fullText.length;

    const typingInterval = setInterval(() => {
      currentCharIndex++;

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          displayedContent: fullText.substring(0, currentCharIndex),
          isTyping: currentCharIndex < textLength
        };
        return updatedMessages;
      });

      if (currentCharIndex >= textLength) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return typingInterval;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      displayedContent: inputMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const responseText = await fetchGeminiResponse(inputMessage);

      const botMessage: Message = {
        role: 'bot',
        content: responseText,
        timestamp: new Date(),
        displayedContent: '',
        isTyping: true,
      };

      setMessages(prev => {
        const newMessages = [...prev, botMessage];

        setTimeout(() => {
          animateTyping(newMessages.length - 1, responseText);
        }, 500);

        return newMessages;
      });
    } catch (error) {
      console.error('Error in chat submission:', error);

      const errorMessage: Message = {
        role: 'bot',
        content: 'I apologize, but I\'m having trouble connecting to my knowledge base right now. Please try again later.',
        timestamp: new Date(),
        displayedContent: '',
        isTyping: true,
      };

      setMessages(prev => {
        const newMessages = [...prev, errorMessage];

        setTimeout(() => {
          animateTyping(newMessages.length - 1, errorMessage.content);
        }, 500);

        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbot-container">
      <button className="chat-toggle" onClick={toggleChat}>
        <Image 
          src="/img/faviconwobg.png" 
          alt="Areion Chat" 
          width={30} 
          height={30} 
          className="chat-toggle-logo"
        />
      </button>

      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-title">
            <div className="logo-container">
              <Image 
                src="/img/faviconwobg.png" 
                alt="Areion" 
                width={40} 
                height={40} 
                className="chat-logo"
              />
            </div>
            <div className="title-text">
              <h3>Business Development</h3>
              <h4>Assistant</h4>
            </div>
          </div>
          <button 
            className="close-btn"
            onClick={toggleChat}
            aria-label="Close chat"
          >
            &times;
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                {message.isTyping ? (
                  <>
                    <span className="typing-text">{message.displayedContent}</span>
                    <span className="cursor">|</span>
                  </>
                ) : (
                  message.displayedContent || message.content
                )}
              </div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
          ))}
          {isTyping && !messages[messages.length - 1]?.isTyping && (
            <div className="message bot-message typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask about business development..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit" aria-label="Send message" className="send-button">
            <Image 
              src="/img/faviconwobg.png" 
              alt="Send" 
              width={24} 
              height={24} 
              className="send-icon"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotSection;
