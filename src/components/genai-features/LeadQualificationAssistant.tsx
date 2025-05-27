'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Lead {
  id: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  source: string;
  lastContact: string;
  interactions: number;
  interests: string[];
  budget: string;
  timeline: string;
  notes: string;
}

interface QualifiedLead extends Lead {
  score: number;
  probability: number;
  stage: 'Cold' | 'Warm' | 'Hot';
  nextSteps: string[];
  insights: string[];
}

const LeadQualificationAssistant = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [qualifiedLeads, setQualifiedLeads] = useState<QualifiedLead[]>([]);
  const [isQualifying, setIsQualifying] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLead, setNewLead] = useState<Lead>({
    id: '',
    name: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    source: '',
    lastContact: '',
    interactions: 0,
    interests: [],
    budget: '',
    timeline: '',
    notes: '',
  });
  const [selectedLead, setSelectedLead] = useState<QualifiedLead | null>(null);
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStage, setFilterStage] = useState('all');

  // Sample data for demonstration
  const sampleLeads: Lead[] = [
    {
      id: 'L001',
      name: 'John Smith',
      company: 'Acme Corporation',
      position: 'CTO',
      email: 'john.smith@acme.com',
      phone: '(555) 123-4567',
      source: 'Website Contact Form',
      lastContact: '2025-05-15',
      interactions: 3,
      interests: ['Cloud Migration', 'AI Integration'],
      budget: '$50,000 - $100,000',
      timeline: 'Q3 2025',
      notes: 'Looking to modernize their infrastructure. Has expressed interest in our enterprise solutions.',
    },
    {
      id: 'L002',
      name: 'Sarah Johnson',
      company: 'Innovate Tech',
      position: 'CEO',
      email: 'sarah@innovatetech.com',
      phone: '(555) 987-6543',
      source: 'LinkedIn',
      lastContact: '2025-05-10',
      interactions: 1,
      interests: ['Digital Transformation', 'Consulting'],
      budget: '$25,000 - $50,000',
      timeline: 'Q4 2025',
      notes: 'Startup with recent funding. Looking for strategic partners to help scale.',
    },
    {
      id: 'L003',
      name: 'Michael Chen',
      company: 'Global Retail Inc.',
      position: 'Marketing Director',
      email: 'mchen@globalretail.com',
      phone: '(555) 456-7890',
      source: 'Referral',
      lastContact: '2025-05-18',
      interactions: 5,
      interests: ['E-commerce Solutions', 'Customer Analytics'],
      budget: '$100,000+',
      timeline: 'Q2 2025',
      notes: 'Urgent need to improve online presence. Competitor recently launched new platform.',
    },
    {
      id: 'L004',
      name: 'Emily Rodriguez',
      company: 'HealthPlus',
      position: 'Operations Manager',
      email: 'emily.r@healthplus.org',
      phone: '(555) 234-5678',
      source: 'Trade Show',
      lastContact: '2025-05-05',
      interactions: 2,
      interests: ['Process Automation', 'Compliance Solutions'],
      budget: 'Under $25,000',
      timeline: 'Q1 2026',
      notes: 'Looking for solutions to streamline patient intake process. Budget constraints.',
    },
    {
      id: 'L005',
      name: 'David Wilson',
      company: 'Financial Services Group',
      position: 'CFO',
      email: 'd.wilson@fsg.com',
      phone: '(555) 876-5432',
      source: 'Webinar Attendee',
      lastContact: '2025-05-20',
      interactions: 4,
      interests: ['Security Solutions', 'Data Analytics'],
      budget: '$75,000 - $150,000',
      timeline: 'Q3 2025',
      notes: 'Concerned about recent security breaches in their industry. Looking for comprehensive solution.',
    },
  ];

  // Load sample data
  const loadSampleData = () => {
    setLeads(sampleLeads);
  };

  // Handle adding a new lead
  const handleAddLead = () => {
    if (!newLead.name || !newLead.company || !newLead.email) return;
    
    const leadToAdd: Lead = {
      ...newLead,
      id: `L${(leads.length + 1).toString().padStart(3, '0')}`,
      interests: newLead.interests.length ? newLead.interests : [],
      interactions: newLead.interactions || 0,
      lastContact: newLead.lastContact || new Date().toISOString().split('T')[0],
    };
    
    setLeads([...leads, leadToAdd]);
    setNewLead({
      id: '',
      name: '',
      company: '',
      position: '',
      email: '',
      phone: '',
      source: '',
      lastContact: '',
      interactions: 0,
      interests: [],
      budget: '',
      timeline: '',
      notes: '',
    });
    setShowAddForm(false);
  };

  // Handle input changes for new lead form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'interests') {
      setNewLead({
        ...newLead,
        interests: value.split(',').map(interest => interest.trim()),
      });
    } else {
      setNewLead({
        ...newLead,
        [name]: value,
      });
    }
  };

  // Qualify leads using AI
  const qualifyLeads = async () => {
    if (leads.length === 0) return;
    
    setIsQualifying(true);
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
      const apiUrl = (process.env.NEXT_PUBLIC_GEMINI_URL || '') + apiKey;
      
      // Prepare the lead data for the API
      const leadsData = leads.map(lead => ({
        id: lead.id,
        name: lead.name,
        company: lead.company,
        position: lead.position,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        lastContact: lead.lastContact,
        interactions: lead.interactions,
        interests: lead.interests,
        budget: lead.budget,
        timeline: lead.timeline,
        notes: lead.notes
      }));
      
      // Create a detailed prompt for lead qualification
      const prompt = `As an AI-powered lead qualification assistant, analyze the following leads and provide a detailed qualification assessment for each. For each lead, provide:

1. A lead score from 0-100 based on their data
2. A conversion probability percentage
3. A lead stage classification (Hot, Warm, or Cold)
4. 3 recommended next steps based on their qualification
5. 2-5 insights about the lead that could help with conversion

Consider these factors in your analysis:
- More interactions indicate higher engagement (up to 25 points)
- Multiple interests suggest broader opportunity (up to 15 points)
- Budget size correlates with deal value (up to 25 points)
- Nearer-term timelines indicate urgency (up to 20 points)
- Lead source quality affects conversion likelihood (up to 15 points)

Here are the leads to analyze:
${JSON.stringify(leadsData, null, 2)}

Respond with a JSON array of qualified leads in this format:
[
  {
    "id": "lead_id",
    "name": "lead_name",
    "company": "company_name",
    "position": "position",
    "email": "email",
    "phone": "phone",
    "source": "source",
    "lastContact": "date",
    "interactions": number,
    "interests": ["interest1", "interest2"],
    "budget": "budget_range",
    "timeline": "timeline",
    "notes": "notes",
    "score": number,
    "probability": number,
    "stage": "Hot/Warm/Cold",
    "nextSteps": ["step1", "step2", "step3"],
    "insights": ["insight1", "insight2"]
  }
]`;
      
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
          temperature: 0.4,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      };

      console.log('Sending request to Gemini API for lead qualification');
      
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
      let qualifiedLeadsData: QualifiedLead[];
      
      try {
        // Find JSON array in the response text (in case there's additional text)
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        const jsonString = jsonMatch ? jsonMatch[0] : responseText;
        
        qualifiedLeadsData = JSON.parse(jsonString);
        
        // Validate the parsed data has the expected structure
        if (!Array.isArray(qualifiedLeadsData) || qualifiedLeadsData.length === 0) {
          throw new Error('Invalid response format from API');
        }
        
        // Ensure all required fields are present in each lead
        qualifiedLeadsData.forEach(lead => {
          if (!lead.id || !lead.score || !lead.probability || !lead.stage || 
              !lead.nextSteps || !lead.insights) {
            throw new Error('Incomplete lead data in API response');
          }
        });
        
        // Set the qualified leads from the API response
        setQualifiedLeads(qualifiedLeadsData);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        
        // Fallback to local qualification if API parsing fails
        console.log('Falling back to local qualification algorithm');
        
        const qualified: QualifiedLead[] = leads.map(lead => {
          // Calculate a score based on various factors
          let score = 0;
          
          // More interactions = higher score (up to 25 points)
          score += Math.min(lead.interactions * 5, 25);
          
          // More interests = higher score (up to 15 points)
          score += Math.min(lead.interests.length * 5, 15);
          
          // Budget factor (up to 25 points)
          if (lead.budget.includes('100,000+')) {
            score += 25;
          } else if (lead.budget.includes('75,000')) {
            score += 20;
          } else if (lead.budget.includes('50,000')) {
            score += 15;
          } else if (lead.budget.includes('25,000')) {
            score += 10;
          } else {
            score += 5;
          }
          
          // Timeline factor (up to 20 points)
          if (lead.timeline.includes('Q2 2025') || lead.timeline.includes('Q3 2025')) {
            score += 20;
          } else if (lead.timeline.includes('Q4 2025')) {
            score += 15;
          } else if (lead.timeline.includes('Q1 2026')) {
            score += 10;
          } else {
            score += 5;
          }
          
          // Source factor (up to 15 points)
          if (lead.source.includes('Referral')) {
            score += 15;
          } else if (lead.source.includes('Website')) {
            score += 10;
          } else if (lead.source.includes('LinkedIn') || lead.source.includes('Trade Show')) {
            score += 8;
          } else {
            score += 5;
          }
          
          // Determine stage based on score
          let stage: 'Cold' | 'Warm' | 'Hot';
          if (score >= 70) {
            stage = 'Hot';
          } else if (score >= 40) {
            stage = 'Warm';
          } else {
            stage = 'Cold';
          }
          
          // Calculate conversion probability
          const probability = Math.min(Math.round(score * 1.2), 95);
          
          // Generate next steps based on stage and score
          const nextSteps = [];
          if (stage === 'Hot') {
            nextSteps.push('Schedule a demo within 48 hours');
            nextSteps.push('Prepare customized proposal');
            nextSteps.push('Involve sales executive in next call');
          } else if (stage === 'Warm') {
            nextSteps.push('Send case studies relevant to their interests');
            nextSteps.push('Schedule follow-up call within 1 week');
            nextSteps.push('Offer free consultation session');
          } else {
            nextSteps.push('Add to nurture email campaign');
            nextSteps.push('Connect on LinkedIn');
            nextSteps.push('Check back in 30 days');
          }
          
          // Generate insights based on lead data
          const insights = [];
          if (lead.interactions > 3) {
            insights.push('High engagement level indicates strong interest');
          }
          if (lead.interests.length > 1) {
            insights.push(`Interest in multiple solutions (${lead.interests.join(', ')}) suggests potential for larger deal`);
          }
          if (lead.source.includes('Referral')) {
            insights.push('Referred leads typically close at 2x the rate of non-referred leads');
          }
          if (lead.budget.includes('100,000')) {
            insights.push('Budget allocation indicates serious buying intent');
          }
          if (lead.timeline.includes('Q2') || lead.timeline.includes('Q3')) {
            insights.push('Near-term timeline suggests urgency to solve problem');
          }
          if (lead.notes.includes('urgent') || lead.notes.includes('immediate') || lead.notes.includes('soon')) {
            insights.push('Notes indicate time sensitivity - prioritize this lead');
          }
          
          return {
            ...lead,
            score,
            probability,
            stage,
            nextSteps,
            insights,
          };
        });
        
        setQualifiedLeads(qualified);
      }
    } catch (error) {
      console.error('Error qualifying leads:', error);
      alert('There was an error qualifying your leads. Please try again.');
    } finally {
      setIsQualifying(false);
    }
  };

  // Sort qualified leads
  const sortedLeads = [...qualifiedLeads].sort((a, b) => {
    if (sortBy === 'score') {
      return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
    } else if (sortBy === 'probability') {
      return sortOrder === 'desc' ? b.probability - a.probability : a.probability - b.probability;
    } else if (sortBy === 'name') {
      return sortOrder === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
    } else if (sortBy === 'company') {
      return sortOrder === 'desc' ? b.company.localeCompare(a.company) : a.company.localeCompare(b.company);
    } else {
      return 0;
    }
  });

  // Filter leads by stage
  const filteredLeads = filterStage === 'all' 
    ? sortedLeads 
    : sortedLeads.filter(lead => lead.stage.toLowerCase() === filterStage.toLowerCase());

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
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
        <h2>Lead Qualification Assistant</h2>
      </div>
      
      <div className="genai-feature-content">
        {leads.length === 0 ? (
          <div className="leads-setup">
            <h3>Get Started with Lead Qualification</h3>
            <p>
              Use AI to analyze your leads, prioritize opportunities, and get personalized follow-up recommendations.
              Load sample data or add your own leads to begin.
            </p>
            
            <div className="setup-actions">
              <button className="primary-btn" onClick={loadSampleData}>
                Load Sample Data
              </button>
              <button className="secondary-btn" onClick={() => setShowAddForm(true)}>
                Add Your Own Leads
              </button>
            </div>
          </div>
        ) : qualifiedLeads.length === 0 ? (
          <div className="leads-list">
            <div className="leads-header">
              <h3>Your Leads ({leads.length})</h3>
              <div className="leads-actions">
                <button className="add-lead-btn" onClick={() => setShowAddForm(true)}>
                  Add Lead
                </button>
                <button 
                  className="qualify-btn"
                  onClick={qualifyLeads}
                  disabled={isQualifying}
                >
                  {isQualifying ? 'Qualifying Leads...' : 'Qualify Leads with AI'}
                </button>
              </div>
            </div>
            
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Last Contact</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.company}</td>
                    <td>{lead.position}</td>
                    <td>{lead.email}</td>
                    <td>{lead.source}</td>
                    <td>{lead.lastContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="qualified-leads">
            {selectedLead ? (
              <div className="lead-details">
                <div className="details-header">
                  <button className="back-btn" onClick={() => setSelectedLead(null)}>
                    ← Back to Leads
                  </button>
                  <h3>Lead Details</h3>
                </div>
                
                <div className="lead-profile">
                  <div className="profile-header">
                    <div className="profile-name">{selectedLead.name}</div>
                    <div className="profile-company">{selectedLead.position} at {selectedLead.company}</div>
                    <div className={`lead-stage ${selectedLead.stage.toLowerCase()}`}>
                      {selectedLead.stage}
                    </div>
                  </div>
                  
                  <div className="profile-scores">
                    <div className="score-card">
                      <div className="score-label">Lead Score</div>
                      <div className="score-value">{selectedLead.score}/100</div>
                      <div 
                        className="score-bar"
                        style={{ width: `${selectedLead.score}%` }}
                      ></div>
                    </div>
                    
                    <div className="score-card">
                      <div className="score-label">Conversion Probability</div>
                      <div className="score-value">{selectedLead.probability}%</div>
                      <div 
                        className="score-bar"
                        style={{ width: `${selectedLead.probability}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="profile-details">
                    <div className="details-section">
                      <h4>Contact Information</h4>
                      <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{selectedLead.email}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Phone:</span>
                        <span className="detail-value">{selectedLead.phone}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Source:</span>
                        <span className="detail-value">{selectedLead.source}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Last Contact:</span>
                        <span className="detail-value">{selectedLead.lastContact}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Interactions:</span>
                        <span className="detail-value">{selectedLead.interactions}</span>
                      </div>
                    </div>
                    
                    <div className="details-section">
                      <h4>Opportunity Details</h4>
                      <div className="detail-item">
                        <span className="detail-label">Interests:</span>
                        <span className="detail-value">{selectedLead.interests.join(', ')}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Budget:</span>
                        <span className="detail-value">{selectedLead.budget}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Timeline:</span>
                        <span className="detail-value">{selectedLead.timeline}</span>
                      </div>
                    </div>
                    
                    <div className="details-section">
                      <h4>Notes</h4>
                      <div className="notes-content">{selectedLead.notes}</div>
                    </div>
                  </div>
                  
                  <div className="ai-insights">
                    <div className="insights-section">
                      <h4>AI Insights</h4>
                      <ul className="insights-list">
                        {selectedLead.insights.map((insight, index) => (
                          <li key={index}>{insight}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="next-steps-section">
                      <h4>Recommended Next Steps</h4>
                      <ol className="next-steps-list">
                        {selectedLead.nextSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="leads-header">
                  <h3>Qualified Leads ({filteredLeads.length})</h3>
                  <div className="filter-controls">
                    <div className="filter-group">
                      <label>Filter by Stage:</label>
                      <select 
                        value={filterStage}
                        onChange={(e) => setFilterStage(e.target.value)}
                      >
                        <option value="all">All Stages</option>
                        <option value="hot">Hot</option>
                        <option value="warm">Warm</option>
                        <option value="cold">Cold</option>
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label>Sort by:</label>
                      <div className="sort-buttons">
                        <button 
                          className={`sort-btn ${sortBy === 'score' ? 'active' : ''}`}
                          onClick={() => toggleSort('score')}
                        >
                          Score {sortBy === 'score' && (sortOrder === 'desc' ? '↓' : '↑')}
                        </button>
                        <button 
                          className={`sort-btn ${sortBy === 'probability' ? 'active' : ''}`}
                          onClick={() => toggleSort('probability')}
                        >
                          Probability {sortBy === 'probability' && (sortOrder === 'desc' ? '↓' : '↑')}
                        </button>
                        <button 
                          className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
                          onClick={() => toggleSort('name')}
                        >
                          Name {sortBy === 'name' && (sortOrder === 'desc' ? '↓' : '↑')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="leads-grid">
                  {filteredLeads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className={`lead-card ${lead.stage.toLowerCase()}`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="lead-header">
                        <div className="lead-name">{lead.name}</div>
                        <div className="lead-company">{lead.company}</div>
                        <div className="lead-stage-badge">{lead.stage}</div>
                      </div>
                      
                      <div className="lead-metrics">
                        <div className="lead-score">
                          <span className="metric-label">Score</span>
                          <span className="metric-value">{lead.score}</span>
                        </div>
                        <div className="lead-probability">
                          <span className="metric-label">Probability</span>
                          <span className="metric-value">{lead.probability}%</span>
                        </div>
                      </div>
                      
                      <div className="lead-details">
                        <div className="detail-row">
                          <span className="detail-label">Interests:</span>
                          <span className="detail-value">{lead.interests.join(', ')}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Budget:</span>
                          <span className="detail-value">{lead.budget}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Timeline:</span>
                          <span className="detail-value">{lead.timeline}</span>
                        </div>
                      </div>
                      
                      <div className="lead-actions">
                        <button className="view-details-btn">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="leads-actions">
                  <button className="reset-btn" onClick={() => {
                    setQualifiedLeads([]);
                    setSelectedLead(null);
                  }}>
                    Reset Qualification
                  </button>
                  <button className="export-btn" onClick={() => window.print()}>
                    Export Leads
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        
        {showAddForm && (
          <div className="add-lead-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Add New Lead</h3>
                <button className="close-modal" onClick={() => setShowAddForm(false)}>×</button>
              </div>
              
              <div className="lead-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newLead.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">Company*</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={newLead.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={newLead.position}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newLead.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={newLead.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="source">Lead Source</label>
                    <input
                      type="text"
                      id="source"
                      name="source"
                      value={newLead.source}
                      onChange={handleInputChange}
                      placeholder="e.g., Website, Referral, LinkedIn"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="interests">Interests</label>
                    <input
                      type="text"
                      id="interests"
                      name="interests"
                      value={newLead.interests.join(', ')}
                      onChange={handleInputChange}
                      placeholder="e.g., Cloud Services, AI, Consulting (comma separated)"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="interactions">Interactions</label>
                    <input
                      type="number"
                      id="interactions"
                      name="interactions"
                      value={newLead.interactions}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="budget">Budget</label>
                    <select
                      id="budget"
                      name="budget"
                      value={newLead.budget}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Budget Range</option>
                      <option value="Under $25,000">Under $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                      <option value="$100,000+">$100,000+</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="timeline">Timeline</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={newLead.timeline}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Timeline</option>
                      <option value="Q2 2025">Q2 2025</option>
                      <option value="Q3 2025">Q3 2025</option>
                      <option value="Q4 2025">Q4 2025</option>
                      <option value="Q1 2026">Q1 2026</option>
                      <option value="Beyond Q1 2026">Beyond Q1 2026</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={newLead.notes}
                    onChange={handleInputChange}
                    rows={3}
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="submit-btn"
                    onClick={handleAddLead}
                    disabled={!newLead.name || !newLead.company || !newLead.email}
                  >
                    Add Lead
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadQualificationAssistant;
