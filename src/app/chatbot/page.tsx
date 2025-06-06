'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import styles from './chatbot.module.css';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  displayedContent?: string;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'Hello! I\'m Areion\'s Business Development Assistant. How can I help you today?',
      timestamp: new Date(),
      displayedContent: 'Hello! I\'m Areion\'s Business Development Assistant. How can I help you today?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingSpeed = 20; // milliseconds per character

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
                text: "You are a business development assistant your name is Areion , a Business Development agency. Focus your responses on business growth, marketing strategies, customer acquisition, and related topics. Keep responses concise, professional, and actionable. Limit responses to 3-4 sentences maximum. Now respond to this: " + prompt
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
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className={styles.container}>
          <div className={styles.header}>
            {/* <h1 className={styles.title}>Business Development Assistant</h1> */}
            <Link href="/" className={styles.backLink}>
              {/* Back to Home */}
            </Link>
          </div>
          
          <div className={styles.chatContainer}>
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.geminiLogo}>
                <Image 
                  src="/img/faviconwobg.png" 
                  alt="Areion" 
                  width={25} 
                  height={25} 
                  className={styles.faviconImage}
                />
              </div>
              <div className={styles.headerInfo}>
                <h2>Business Development Assistant</h2>
                <p>Powered by Areion</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className={styles.messagesContainer}>
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.botMessage}`}
                >
                  {message.role === 'bot' && (
                    <div className={styles.botAvatar}>
                      <Image 
                        src="/img/faviconwobg.png" 
                        alt="Areion" 
                        width={20} 
                        height={20} 
                        className={styles.faviconImage}
                      />
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    {message.isTyping ? (
                      <>
                        <span className={styles.typingText}>{message.displayedContent}</span>
                        <span className={styles.cursor}>|</span>
                      </>
                    ) : (
                      message.displayedContent || message.content
                    )}
                    <div className={styles.messageTime}>{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              ))}
              {isTyping && !messages[messages.length - 1]?.isTyping && (
                <div className={`${styles.message} ${styles.botMessage} ${styles.typing}`}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className={styles.inputContainer}>
              <form className={styles.inputForm} onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Ask about business development..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className={styles.inputField}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  className={styles.sendButton}
                  disabled={isTyping || !inputMessage.trim()}
                >
                  <svg className={styles.sendIcon} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChatbotPage;
