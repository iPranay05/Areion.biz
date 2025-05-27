'use client';
import { useState } from 'react';
import Image from 'next/image';

interface CompetitorData {
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  rating: number;
}

interface TrendData {
  name: string;
  growth: number;
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  timeframe: string;
}

interface OpportunityData {
  title: string;
  description: string;
  potentialImpact: number;
  effortRequired: number;
  category: string;
}

interface RiskData {
  title: string;
  probability: number;
  impact: number;
  mitigation: string;
  category: string;
}

interface MarketAnalysis {
  industry: string;
  competitors: CompetitorData[];
  trends: TrendData[];
  opportunities: OpportunityData[];
  risks: RiskData[];
  summary: string;
}

const MarketAnalysisDashboard = () => {
  const [industry, setIndustry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState('competitors');
  const [error, setError] = useState<string | null>(null);

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Education',
    'Real Estate',
    'Food & Beverage',
    'Entertainment',
    'Transportation',
  ];

  const generateAnalysis = async () => {
    if (!industry) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
      const apiUrl = (process.env.NEXT_PUBLIC_GEMINI_URL || '') + apiKey;
      
      // Create a detailed prompt for market analysis
      const prompt = `Generate a comprehensive market analysis for the ${industry} industry. The analysis should include:

1. Top competitors with their market share percentages, key strengths (3-4 points), weaknesses (3-4 points), and a rating from 1-5
2. Current market trends with growth rates, impact levels (High/Medium/Low), descriptions, and timeframes
3. Key opportunities with descriptions, potential impact scores (1-10), effort required scores (1-10), and categories
4. Potential risks with probability scores (1-10), impact scores (1-10), mitigation strategies, and categories
5. A brief executive summary of the overall market situation

Format the response as a structured JSON object with the following structure:
{
  "industry": "${industry}",
  "competitors": [
    {
      "name": "Competitor Name",
      "marketShare": number,
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"],
      "rating": number
    }
  ],
  "trends": [
    {
      "name": "Trend Name",
      "growth": number,
      "impact": "High/Medium/Low",
      "description": "Description",
      "timeframe": "Timeframe"
    }
  ],
  "opportunities": [
    {
      "title": "Opportunity Title",
      "description": "Description",
      "potentialImpact": number,
      "effortRequired": number,
      "category": "Category"
    }
  ],
  "risks": [
    {
      "title": "Risk Title",
      "probability": number,
      "impact": number,
      "mitigation": "Mitigation strategy",
      "category": "Category"
    }
  ],
  "summary": "Executive summary text"
}`;
      
      // Prepare request for Gemini API
      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt
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

      console.log('Sending request to Gemini API for market analysis');
      
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
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Parse the JSON response
      let analysisData: MarketAnalysis;
      
      try {
        // Find JSON object in the response text (in case there's additional text)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : responseText;
        
        analysisData = JSON.parse(jsonString);
        
        // Validate the parsed data has the expected structure
        if (!analysisData.industry || !analysisData.competitors || !analysisData.trends || 
            !analysisData.opportunities || !analysisData.risks || !analysisData.summary) {
          throw new Error('Incomplete data structure in API response');
        }
        
        // Set the analysis data from the API response
        setAnalysis(analysisData);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        throw new Error('Failed to parse market analysis data from API response');
      }
    } catch (error) {
      console.error('Error generating market analysis:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
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
        <h2>Market Analysis Dashboard</h2>
      </div>
      
      <div className="genai-feature-content">
        {!analysis ? (
          <div className="industry-selection">
            <h3>Select an Industry to Analyze</h3>
            <p>Choose an industry to generate a comprehensive market analysis powered by AI.</p>
            
            <div className="industry-grid">
              {industries.map((ind) => (
                <button
                  key={ind}
                  className={`industry-button ${industry === ind ? 'selected' : ''}`}
                  onClick={() => setIndustry(ind)}
                >
                  {ind}
                </button>
              ))}
            </div>
            
            <button 
              className="generate-button" 
              onClick={generateAnalysis}
              disabled={!industry || isLoading}
            >
              {isLoading ? 'Generating Analysis...' : 'Generate Analysis'}
            </button>
            
            {error && <div className="error-message">{error}</div>}
          </div>
        ) : (
          <div className="analysis-results">
            <div className="analysis-header">
              <h3>{analysis.industry} Industry Analysis</h3>
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'competitors' ? 'active' : ''}`}
                  onClick={() => setActiveTab('competitors')}
                >
                  Competitors
                </button>
                <button 
                  className={`tab ${activeTab === 'trends' ? 'active' : ''}`}
                  onClick={() => setActiveTab('trends')}
                >
                  Trends
                </button>
                <button 
                  className={`tab ${activeTab === 'opportunities' ? 'active' : ''}`}
                  onClick={() => setActiveTab('opportunities')}
                >
                  Opportunities
                </button>
                <button 
                  className={`tab ${activeTab === 'risks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('risks')}
                >
                  Risks
                </button>
                <button 
                  className={`tab ${activeTab === 'summary' ? 'active' : ''}`}
                  onClick={() => setActiveTab('summary')}
                >
                  Summary
                </button>
              </div>
            </div>
            
            <div className="tab-content">
              {activeTab === 'competitors' && (
                <div className="competitors-tab">
                  <h4>Key Competitors</h4>
                  <div className="market-share-chart">
                    <h5>Market Share Distribution</h5>
                    <div className="chart-bars">
                      {analysis.competitors.map((competitor, index) => (
                        <div className="chart-bar-container" key={index}>
                          <div 
                            className="chart-bar"
                            style={{ height: `${competitor.marketShare * 3}px` }}
                          >
                            <span className="market-share-value">{competitor.marketShare}%</span>
                          </div>
                          <div className="competitor-name">{competitor.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="competitors-grid">
                    {analysis.competitors.map((competitor, index) => (
                      <div className="competitor-card" key={index}>
                        <div className="competitor-header">
                          <h5>{competitor.name}</h5>
                          <div className="competitor-rating">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span 
                                key={i} 
                                className={`star ${i < Math.floor(competitor.rating) ? 'filled' : ''} ${i === Math.floor(competitor.rating) && competitor.rating % 1 > 0 ? 'half-filled' : ''}`}
                              >★</span>
                            ))}
                            <span className="rating-value">{competitor.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        
                        <div className="competitor-strengths">
                          <h6>Strengths</h6>
                          <ul>
                            {competitor.strengths.map((strength, i) => (
                              <li key={i}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="competitor-weaknesses">
                          <h6>Weaknesses</h6>
                          <ul>
                            {competitor.weaknesses.map((weakness, i) => (
                              <li key={i}>{weakness}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'trends' && (
                <div className="trends-tab">
                  <h4>Market Trends</h4>
                  <div className="trends-grid">
                    {analysis.trends.map((trend, index) => (
                      <div className="trend-card" key={index}>
                        <div className="trend-header">
                          <h5>{trend.name}</h5>
                          <div className={`impact-badge ${trend.impact.toLowerCase()}`}>
                            {trend.impact} Impact
                          </div>
                        </div>
                        
                        <div className="trend-growth">
                          <div className="growth-label">Growth Rate</div>
                          <div className="growth-value">{trend.growth}%</div>
                          <div 
                            className={`growth-bar ${trend.growth >= 0 ? 'positive' : 'negative'}`}
                            style={{ width: `${Math.min(Math.abs(trend.growth) * 2, 100)}%` }}
                          ></div>
                        </div>
                        
                        <div className="trend-details">
                          <p>{trend.description}</p>
                          <div className="trend-timeframe">
                            <span className="timeframe-label">Timeframe:</span>
                            <span className="timeframe-value">{trend.timeframe}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'opportunities' && (
                <div className="opportunities-tab">
                  <h4>Key Opportunities</h4>
                  <div className="opportunities-grid">
                    {analysis.opportunities.map((opportunity, index) => (
                      <div className="opportunity-card" key={index}>
                        <div className="opportunity-header">
                          <h5>{opportunity.title}</h5>
                          <div className="opportunity-category">{opportunity.category}</div>
                        </div>
                        
                        <div className="opportunity-description">
                          <p>{opportunity.description}</p>
                        </div>
                        
                        <div className="opportunity-metrics">
                          <div className="metric">
                            <div className="metric-label">Potential Impact</div>
                            <div className="metric-bar-container">
                              <div 
                                className="metric-bar impact"
                                style={{ width: `${opportunity.potentialImpact * 10}%` }}
                              ></div>
                              <span className="metric-value">{opportunity.potentialImpact}/10</span>
                            </div>
                          </div>
                          
                          <div className="metric">
                            <div className="metric-label">Effort Required</div>
                            <div className="metric-bar-container">
                              <div 
                                className="metric-bar effort"
                                style={{ width: `${opportunity.effortRequired * 10}%` }}
                              ></div>
                              <span className="metric-value">{opportunity.effortRequired}/10</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'risks' && (
                <div className="risks-tab">
                  <h4>Potential Risks</h4>
                  <div className="risks-grid">
                    {analysis.risks.map((risk, index) => (
                      <div className="risk-card" key={index}>
                        <div className="risk-header">
                          <h5>{risk.title}</h5>
                          <div className="risk-category">{risk.category}</div>
                        </div>
                        
                        <div className="risk-metrics">
                          <div className="risk-metric">
                            <div className="risk-metric-label">Probability</div>
                            <div 
                              className="risk-meter"
                              style={{ 
                                background: `conic-gradient(#ff6b6b ${risk.probability * 36}deg, #f0f0f0 0deg)` 
                              }}
                            >
                              <div className="risk-meter-value">{risk.probability}</div>
                            </div>
                          </div>
                          
                          <div className="risk-metric">
                            <div className="risk-metric-label">Impact</div>
                            <div 
                              className="risk-meter"
                              style={{ 
                                background: `conic-gradient(#ff9f43 ${risk.impact * 36}deg, #f0f0f0 0deg)` 
                              }}
                            >
                              <div className="risk-meter-value">{risk.impact}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="risk-mitigation">
                          <h6>Mitigation Strategy</h6>
                          <p>{risk.mitigation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'summary' && (
                <div className="summary-tab">
                  <h4>Executive Summary</h4>
                  <div className="summary-content">
                    <p>{analysis.summary}</p>
                  </div>
                  
                  <div className="key-takeaways">
                    <h5>Key Takeaways</h5>
                    <div className="takeaways-grid">
                      <div className="takeaway-card">
                        <div className="takeaway-icon">🏆</div>
                        <div className="takeaway-content">
                          <h6>Top Competitor</h6>
                          <p>{analysis.competitors[0].name} ({analysis.competitors[0].marketShare}% market share)</p>
                        </div>
                      </div>
                      
                      <div className="takeaway-card">
                        <div className="takeaway-icon">📈</div>
                        <div className="takeaway-content">
                          <h6>Strongest Trend</h6>
                          <p>{analysis.trends[0].name} ({analysis.trends[0].growth}% growth)</p>
                        </div>
                      </div>
                      
                      <div className="takeaway-card">
                        <div className="takeaway-icon">💡</div>
                        <div className="takeaway-content">
                          <h6>Top Opportunity</h6>
                          <p>{analysis.opportunities[0].title} (Impact: {analysis.opportunities[0].potentialImpact}/10)</p>
                        </div>
                      </div>
                      
                      <div className="takeaway-card">
                        <div className="takeaway-icon">⚠️</div>
                        <div className="takeaway-content">
                          <h6>Highest Risk</h6>
                          <p>{analysis.risks[0].title} (Impact: {analysis.risks[0].impact}/10)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="analysis-actions">
              <button 
                className="reset-button"
                onClick={() => {
                  setAnalysis(null);
                  setActiveTab('competitors');
                }}
              >
                Generate New Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketAnalysisDashboard;
