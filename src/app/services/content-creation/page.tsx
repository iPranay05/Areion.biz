'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

const ContentCreationPage = () => {
  // Add the CSS files to the document head
  useEffect(() => {
    // Add service cards CSS
    const cardLink = document.createElement('link');
    cardLink.rel = 'stylesheet';
    cardLink.href = '/assets/css/service-cards.css';
    document.head.appendChild(cardLink);
    
    // Add service page CSS
    const pageLink = document.createElement('link');
    pageLink.rel = 'stylesheet';
    pageLink.href = '/assets/css/service-page.css';
    document.head.appendChild(pageLink);
    
    return () => {
      document.head.removeChild(cardLink);
      document.head.removeChild(pageLink);
    };
  }, []);

  return (
    <div className="service-page-container">
      <div className="service-page-header">
        <Link href="/" className="back-button">
          <span className="back-icon">←</span> Back to Home
        </Link>
        <h1 className="service-page-title">Content Creation</h1>
        <div className="service-icon-container">
          <div className="service-icon-large">
            <Image src="/assets/img/pen-tool.png" alt="Content Creation" width={80} height={80} />
          </div>
          <p className="service-page-description">
            Engaging, high-quality content that resonates with your audience and drives results.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="service-section">
            <h2 className="service-section-title">Our Content Creation Services</h2>
            <p>
              Great content is the foundation of successful digital marketing. Our content creation services include:
            </p>
            <div className="row mt-4">
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">📝</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Blog Posts & Articles</h5>
                    <p>Informative, SEO-optimized blog content that establishes your authority and drives organic traffic.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">📸</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Social Media Content</h5>
                    <p>Engaging posts, graphics, and captions tailored to each platform's unique audience and format.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">✉️</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Email Newsletters</h5>
                    <p>Compelling email content that nurtures leads, drives conversions, and builds customer loyalty.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">🎥</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Video Scripts</h5>
                    <p>Engaging scripts for explainer videos, product demos, testimonials, and social media content.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">💻</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Website Copy</h5>
                    <p>Persuasive, conversion-focused copy for landing pages, product descriptions, and more.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">📖</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Whitepapers & Ebooks</h5>
                    <p>In-depth, valuable content that generates leads and positions you as an industry expert.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="service-section">
            <h2 className="service-section-title">Our Content Creation Process</h2>
            <div className="service-step">
              <div className="service-step-number">1</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Research & Strategy</h5>
                <p>We start by understanding your audience, industry, and goals to develop a content strategy that delivers results.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">2</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Content Creation</h5>
                <p>Our skilled writers, designers, and editors create high-quality content tailored to your brand voice and objectives.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">3</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Review & Refinement</h5>
                <p>We collaborate with you to refine the content until it perfectly matches your vision and requirements.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">4</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Publication & Analysis</h5>
                <p>We help you publish the content and analyze its performance to continuously improve results.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Ready to Get Started?</h3>
            <p>Contact us today to discuss how our content creation services can help your business grow.</p>
            <Link href="/contact" className="service-cta-button">
              Contact Us
            </Link>
          </div>

          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Content Packages</h3>
            <div className="mb-3 pb-3 border-bottom">
              <h5>Starter Package</h5>
              <p className="small">4 blog posts per month, basic social media content, and monthly newsletter.</p>
              <p className="fw-bold mb-0">Starting at $799/month</p>
            </div>
            <div className="mb-3 pb-3 border-bottom">
              <h5>Growth Package</h5>
              <p className="small">8 blog posts per month, comprehensive social media content, bi-weekly newsletters, and quarterly whitepaper.</p>
              <p className="fw-bold mb-0">Starting at $1,499/month</p>
            </div>
            <div className="p-3">
              <h5>Premium Package</h5>
              <p className="small">12 blog posts per month, advanced social media strategy, weekly newsletters, monthly video scripts, and quarterly ebooks.</p>
              <p className="fw-bold mb-0">Starting at $2,999/month</p>
            </div>
          </div>

          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Related Services</h3>
            <ul className="related-services-list">
              <li className="related-service-item">
                <Link href="/services/digital-marketing" className="related-service-link">
                  Digital Marketing
                </Link>
              </li>
              <li className="related-service-item">
                <Link href="/services/seo-optimization" className="related-service-link">
                  SEO Optimization
                </Link>
              </li>
              <li className="related-service-item">
                <Link href="/services/social-media-management" className="related-service-link">
                  Social Media Management
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreationPage;
