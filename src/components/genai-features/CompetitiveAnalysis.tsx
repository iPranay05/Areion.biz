'use client';
import { useState } from 'react';

interface Competitor {
  name: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  marketShare: number;
  keyDifferentiator: string;
  pricingStrategy: string;
  targetAudience: string;
}

interface CompetitiveAnalysisData {
  competitors: Competitor[];
  marketInsights: string[];
  recommendedStrategies: string[];
}

const CompetitiveAnalysis = () => {
  const [industry, setIndustry] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [analysisData, setAnalysisData] = useState<CompetitiveAnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateAnalysis = async () => {
    if (!industry.trim() || !competitors.trim()) {
      setError('Please enter both industry and competitor information');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysisData(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
      const apiUrl = (process.env.NEXT_PUBLIC_GEMINI_URL || '') + apiKey;
      
      // Create a detailed prompt for competitive analysis
      const promptText = `Generate a detailed competitive analysis for a company in the ${industry} industry, analyzing the following competitors: ${competitors}.

Please structure your response as a JSON object with the following format:
{
  "competitors": [
    {
      "name": "Competitor Name",
      "strengths": ["Strength 1", "Strength 2", "Strength 3"],
      "weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"],
      "opportunities": ["Opportunity 1", "Opportunity 2"],
      "threats": ["Threat 1", "Threat 2"],
      "marketShare": estimated_percentage_number,
      "keyDifferentiator": "Main differentiating factor",
      "pricingStrategy": "Description of pricing approach",
      "targetAudience": "Description of target market"
    }
  ],
  "marketInsights": [
    "Key market insight 1",
    "Key market insight 2",
    "Key market insight 3"
  ],
  "recommendedStrategies": [
    "Recommended strategy 1",
    "Recommended strategy 2",
    "Recommended strategy 3"
  ]
}

Ensure the analysis is realistic, data-driven, and provides actionable insights for a business in the ${industry} industry. Include 3-5 competitors based on the information provided.`;

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
          temperature: 0.4,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      };

      console.log('Sending request to Gemini API for competitive analysis');
      
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
      try {
        // Find JSON object in the response text (in case there's additional text)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : responseText;
        
        const parsedData = JSON.parse(jsonString) as CompetitiveAnalysisData;
        
        // Validate the parsed data has the expected structure
        if (!parsedData.competitors || !Array.isArray(parsedData.competitors) || 
            !parsedData.marketInsights || !Array.isArray(parsedData.marketInsights) ||
            !parsedData.recommendedStrategies || !Array.isArray(parsedData.recommendedStrategies)) {
          throw new Error('Invalid response format from API');
        }
        
        setAnalysisData(parsedData);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        throw new Error('Failed to parse the analysis data. Please try again.');
      }
    } catch (error) {
      console.error('Error generating analysis:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Competitive Analysis</h2>
      
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <input
              type="text"
              id="industry"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., SaaS, E-commerce, FinTech"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="competitors" className="block text-sm font-medium text-gray-700 mb-1">
              Competitors (comma separated)
            </label>
            <input
              type="text"
              id="competitors"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Company A, Company B, Company C"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
            />
          </div>
        </div>
        
        <button
          onClick={generateAnalysis}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Generating Analysis...' : 'Generate Competitive Analysis'}
        </button>
        
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {analysisData && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Competitor Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {analysisData.competitors.map((competitor, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="text-lg font-medium text-blue-600 mb-2">{competitor.name}</h4>
                <p className="text-sm text-gray-500 mb-1">Market Share: {competitor.marketShare}%</p>
                <p className="text-sm text-gray-700 mb-3">
                  <span className="font-medium">Key Differentiator:</span> {competitor.keyDifferentiator}
                </p>
                
                <div className="mb-2">
                  <h5 className="text-sm font-medium text-gray-700">Strengths:</h5>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {competitor.strengths.map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-2">
                  <h5 className="text-sm font-medium text-gray-700">Weaknesses:</h5>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {competitor.weaknesses.map((weakness, idx) => (
                      <li key={idx}>{weakness}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-2">
                  <h5 className="text-sm font-medium text-gray-700">Target Audience:</h5>
                  <p className="text-sm text-gray-600">{competitor.targetAudience}</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Pricing Strategy:</h5>
                  <p className="text-sm text-gray-600">{competitor.pricingStrategy}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="text-lg font-medium text-blue-600 mb-3">Market Insights</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                {analysisData.marketInsights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="text-lg font-medium text-blue-600 mb-3">Recommended Strategies</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                {analysisData.recommendedStrategies.map((strategy, index) => (
                  <li key={index}>{strategy}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitiveAnalysis;
