'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface Recommendation {
  category: string;
  title: string;
  description: string;
  actionItems: string[];
}

const BusinessRecommendations = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const questions: Question[] = [
    {
      id: 'industry',
      text: 'What industry is your business in?',
      options: [
        { id: 'tech', text: 'Technology' },
        { id: 'retail', text: 'Retail' },
        { id: 'healthcare', text: 'Healthcare' },
        { id: 'finance', text: 'Finance' },
        { id: 'education', text: 'Education' },
        { id: 'other', text: 'Other' },
      ],
    },
    {
      id: 'size',
      text: 'What is the size of your business?',
      options: [
        { id: 'startup', text: 'Startup (1-10 employees)' },
        { id: 'small', text: 'Small (11-50 employees)' },
        { id: 'medium', text: 'Medium (51-200 employees)' },
        { id: 'large', text: 'Large (201+ employees)' },
      ],
    },
    {
      id: 'challenge',
      text: 'What is your biggest business challenge right now?',
      options: [
        { id: 'growth', text: 'Growing customer base' },
        { id: 'retention', text: 'Customer retention' },
        { id: 'operations', text: 'Operational efficiency' },
        { id: 'competition', text: 'Competitive pressure' },
        { id: 'funding', text: 'Securing funding' },
        { id: 'talent', text: 'Talent acquisition' },
      ],
    },
    {
      id: 'goal',
      text: 'What is your primary business goal for the next 12 months?',
      options: [
        { id: 'revenue', text: 'Increase revenue' },
        { id: 'market', text: 'Expand market share' },
        { id: 'product', text: 'Launch new product/service' },
        { id: 'cost', text: 'Reduce costs' },
        { id: 'digital', text: 'Digital transformation' },
        { id: 'exit', text: 'Prepare for exit/acquisition' },
      ],
    },
  ];

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers({
      ...answers,
      [questionId]: answerId,
    });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would call the Gemini API
      // For now, we'll use placeholder recommendations based on the answers
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Example recommendations based on answers
      const industryRecs: Record<string, Recommendation> = {
        tech: {
          category: 'Technology Strategy',
          title: 'Leverage Cloud Solutions',
          description: 'Moving to cloud-based infrastructure can reduce costs and increase scalability.',
          actionItems: [
            'Audit current technology stack',
            'Research cloud providers (AWS, Azure, GCP)',
            'Develop migration timeline',
            'Train team on cloud technologies'
          ]
        },
        retail: {
          category: 'Retail Strategy',
          title: 'Omnichannel Retail Approach',
          description: 'Integrate online and offline shopping experiences to meet customers where they are.',
          actionItems: [
            'Implement click-and-collect options',
            'Sync inventory across channels',
            'Create consistent branding across touchpoints',
            'Develop mobile app for shopping'
          ]
        },
        healthcare: {
          category: 'Healthcare Strategy',
          title: 'Telehealth Integration',
          description: 'Expanding telehealth services can increase patient access and satisfaction.',
          actionItems: [
            'Evaluate telehealth platforms',
            'Train providers on virtual care',
            'Update billing processes',
            'Create patient education materials'
          ]
        },
        finance: {
          category: 'Financial Strategy',
          title: 'Digital Banking Transformation',
          description: 'Enhancing digital banking capabilities to meet modern customer expectations.',
          actionItems: [
            'Upgrade mobile banking app',
            'Implement AI for fraud detection',
            'Streamline loan application process',
            'Develop personalized financial insights'
          ]
        },
        education: {
          category: 'Education Strategy',
          title: 'Blended Learning Model',
          description: 'Combining online and in-person instruction for optimal learning outcomes.',
          actionItems: [
            'Develop digital curriculum',
            'Train educators on technology tools',
            'Create assessment strategy',
            'Implement learning management system'
          ]
        },
        other: {
          category: 'Business Strategy',
          title: 'Digital Transformation',
          description: 'Implementing digital solutions to streamline operations and enhance customer experience.',
          actionItems: [
            'Conduct digital maturity assessment',
            'Identify key processes for digitization',
            'Develop implementation roadmap',
            'Measure ROI of digital initiatives'
          ]
        }
      };
      
      const challengeRecs: Record<string, Recommendation> = {
        growth: {
          category: 'Growth Strategy',
          title: 'Customer Acquisition Framework',
          description: 'A structured approach to identifying and converting new customers.',
          actionItems: [
            'Define ideal customer profile',
            'Optimize marketing channels',
            'Implement referral program',
            'Develop content marketing strategy'
          ]
        },
        retention: {
          category: 'Retention Strategy',
          title: 'Customer Success Program',
          description: 'Proactive approach to ensure customers achieve their desired outcomes.',
          actionItems: [
            'Implement customer health scoring',
            'Create onboarding process',
            'Develop regular check-in cadence',
            'Build customer education resources'
          ]
        },
        operations: {
          category: 'Operational Strategy',
          title: 'Process Optimization',
          description: 'Streamlining workflows to improve efficiency and reduce costs.',
          actionItems: [
            'Map current processes',
            'Identify bottlenecks',
            'Implement automation where possible',
            'Establish KPIs for operational efficiency'
          ]
        },
        competition: {
          category: 'Competitive Strategy',
          title: 'Differentiation Framework',
          description: 'Clearly defining and communicating your unique value proposition.',
          actionItems: [
            'Conduct competitive analysis',
            'Identify unique strengths',
            'Refine messaging and positioning',
            'Train sales team on differentiation points'
          ]
        },
        funding: {
          category: 'Financial Strategy',
          title: 'Investment Readiness Plan',
          description: 'Preparing your business to attract and secure funding.',
          actionItems: [
            'Create compelling pitch deck',
            'Develop financial projections',
            'Identify potential investors',
            'Prepare due diligence documentation'
          ]
        },
        talent: {
          category: 'Talent Strategy',
          title: 'Employer Branding Initiative',
          description: 'Building a reputation as an employer of choice to attract top talent.',
          actionItems: [
            'Define employee value proposition',
            'Enhance recruitment marketing',
            'Implement employee advocacy program',
            'Develop career progression framework'
          ]
        }
      };
      
      // Generate recommendations based on answers
      const generatedRecs: Recommendation[] = [];
      
      if (answers.industry) {
        generatedRecs.push(industryRecs[answers.industry]);
      }
      
      if (answers.challenge) {
        generatedRecs.push(challengeRecs[answers.challenge]);
      }
      
      // Add a general recommendation based on business size
      if (answers.size) {
        const sizeRec: Recommendation = {
          category: 'Scaling Strategy',
          title: answers.size === 'startup' || answers.size === 'small' 
            ? 'Lean Growth Framework' 
            : 'Enterprise Scaling Model',
          description: answers.size === 'startup' || answers.size === 'small'
            ? 'Maximizing resources while maintaining agility to grow efficiently.'
            : 'Structured approach to scaling operations while maintaining quality and culture.',
          actionItems: answers.size === 'startup' || answers.size === 'small'
            ? [
                'Identify core growth levers',
                'Implement agile methodology',
                'Focus on unit economics',
                'Build scalable systems'
              ]
            : [
                'Develop governance framework',
                'Implement change management',
                'Create cross-functional teams',
                'Standardize processes'
              ]
        };
        
        generatedRecs.push(sizeRec);
      }
      
      setRecommendations(generatedRecs);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendations([]);
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
        <h2>Business Recommendations</h2>
      </div>
      
      <div className="genai-feature-content">
        {recommendations.length === 0 ? (
          <>
            <div className="question-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentStep / questions.length) * 100}%` }}
                ></div>
              </div>
              <div className="progress-text">
                Question {currentStep + 1} of {questions.length}
              </div>
            </div>
            
            <div className="question-container">
              <h3 className="question-text">{questions[currentStep].text}</h3>
              <div className="options-container">
                {questions[currentStep].options.map((option) => (
                  <button
                    key={option.id}
                    className={`option-btn ${answers[questions[currentStep].id] === option.id ? 'selected' : ''}`}
                    onClick={() => handleAnswer(questions[currentStep].id, option.id)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
            
            {currentStep === questions.length - 1 && Object.keys(answers).length === questions.length && (
              <button 
                className="generate-btn"
                onClick={generateRecommendations}
                disabled={isGenerating}
              >
                {isGenerating ? 'Analyzing your business...' : 'Get Personalized Recommendations'}
              </button>
            )}
          </>
        ) : (
          <div className="recommendations-container">
            <h3 className="recommendations-title">Your Personalized Business Recommendations</h3>
            
            <div className="recommendations-list">
              {recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <div className="recommendation-category">{rec.category}</div>
                  <h4 className="recommendation-title">{rec.title}</h4>
                  <p className="recommendation-description">{rec.description}</p>
                  
                  <div className="action-items">
                    <h5>Recommended Actions:</h5>
                    <ul>
                      {rec.actionItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="recommendations-actions">
              <button className="reset-btn" onClick={resetQuiz}>
                Start Over
              </button>
              <button className="save-btn" onClick={() => window.print()}>
                Save Recommendations
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessRecommendations;
