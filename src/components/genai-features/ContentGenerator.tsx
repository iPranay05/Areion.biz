'use client';
import { useState } from 'react';
import Image from 'next/image';

type ContentType = 'business-plan' | 'marketing-copy' | 'social-media' | 'email-campaign';

const ContentGenerator = () => {
  const [contentType, setContentType] = useState<ContentType>('business-plan');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTypes = [
    { id: 'business-plan', label: 'Business Plan Outline', icon: '📝' },
    { id: 'marketing-copy', label: 'Marketing Copy', icon: '🚀' },
    { id: 'social-media', label: 'Social Media Posts', icon: '📱' },
    { id: 'email-campaign', label: 'Email Campaign', icon: '📧' },
  ];

  const placeholders = {
    'business-plan': 'Describe your business idea (e.g., "A subscription service for eco-friendly office supplies")...',
    'marketing-copy': 'What product or service are you promoting? Include key features and target audience...',
    'social-media': 'What message do you want to convey? Include product/service and target platform...',
    'email-campaign': 'What is the goal of your email campaign? Include target audience and call to action...',
  };

  const generateContent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedContent('');
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
      const apiUrl = (process.env.NEXT_PUBLIC_GEMINI_URL || '') + apiKey;
      
      // Create a dynamic prompt based on the content type and user input
      let contentDescription = '';
      let formatInstructions = '';
      
      switch(contentType) {
        case 'business-plan':
          contentDescription = 'business plan';
          formatInstructions = 'Include sections like Executive Summary, Market Analysis, Product/Service Description, Marketing Strategy, Financial Projections, and any other relevant sections.';
          break;
          
        case 'marketing-copy':
          contentDescription = 'marketing copy';
          formatInstructions = 'Include a compelling headline, subheading, key benefits, and a clear call to action.';
          break;
          
        case 'social-media':
          contentDescription = 'social media posts';
          formatInstructions = 'Create posts for multiple platforms (LinkedIn, Twitter, Instagram, etc.) with appropriate tone and format for each platform.';
          break;
          
        case 'email-campaign':
          contentDescription = 'email campaign';
          formatInstructions = 'Include a subject line, introduction, body content, call to action, and professional closing.';
          break;
      }
      
      // Create a completely dynamic prompt with no hardcoded templates
      const promptText = `Generate professional ${contentDescription} content based on the following information: "${prompt}"

Be creative and generate high-quality, original content that would be ready for professional use. ${formatInstructions}

Format your response in Markdown to make it easily readable and well-structured. Do not include any placeholders or template language - all content should be specific to the provided information and ready to use.`;
      
      // Prepare request for Gemini API
      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: promptText
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      };

      console.log('Sending request to Gemini API for content generation');
      
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
      console.log('Received response from Gemini API:', data);
      
      // Extract the response text from Gemini API
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      setGeneratedContent(result);
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('Sorry, there was an error generating your content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="genai-feature-container">
      <div className="genai-feature-header">
        <Image 
          src="/img/faviconwobg.png" 
          alt="Areion" 
          width={30} 
          height={30} 
          className="genai-feature-logo"
        />
        <h2>AI Content Generator</h2>
      </div>
      
      <div className="genai-feature-content">
        <div className="content-type-selector">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              className={`content-type-btn ${contentType === type.id ? 'active' : ''}`}
              onClick={() => setContentType(type.id as ContentType)}
            >
              <span className="content-type-icon">{type.icon}</span>
              <span className="content-type-label">{type.label}</span>
            </button>
          ))}
        </div>
        
        <div className="content-input-area">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholders[contentType]}
            rows={5}
            className="content-prompt-input"
          />
          
          <button 
            className="generate-btn"
            onClick={generateContent}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? 'Generating...' : 'Generate Content'}
          </button>
        </div>
        
        {generatedContent && (
          <div className="generated-content-area">
            <h3>Generated Content</h3>
            <div className="generated-content">
              {generatedContent.split('\n').map((line, index) => (
                <div key={index} className={line.startsWith('#') ? 'content-heading' : 'content-text'}>
                  {line.replace(/^#+\s/, '')}
                </div>
              ))}
            </div>
            <div className="content-actions">
              <button className="content-action-btn" onClick={() => navigator.clipboard.writeText(generatedContent)}>
                Copy to Clipboard
              </button>
              <button className="content-action-btn" onClick={() => window.print()}>
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentGenerator;
