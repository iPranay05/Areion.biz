'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

const DigitalMarketingPage = () => {
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
        <h1 className="service-page-title">Digital Marketing</h1>
        <div className="service-icon-container">
          <div className="service-icon-large">
            <Image src="/assets/img/digital_marketing.png" alt="Digital Marketing" width={80} height={80} />
          </div>
          <p className="service-page-description">
            Strategic digital marketing solutions to grow your brand and reach your target audience.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="service-section">
            <h2 className="service-section-title">Comprehensive Digital Marketing Services</h2>
            <p>
              Our digital marketing experts develop customized strategies to help your business thrive in the digital landscape. Our services include:
            </p>
            <div className="row mt-4">
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">🔍</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Search Engine Marketing</h5>
                    <p>Drive targeted traffic to your website through paid search campaigns and SEO optimization.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">#️⃣</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Social Media Marketing</h5>
                    <p>Build brand awareness and engage with your audience across all major social platforms.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">✉️</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Email Marketing</h5>
                    <p>Nurture leads and drive conversions with targeted email campaigns and automation.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">🎯</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Display Advertising</h5>
                    <p>Reach potential customers with visually appealing ads across the web.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">📈</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Analytics & Reporting</h5>
                    <p>Track and measure campaign performance to optimize your marketing ROI.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">🎯</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Conversion Rate Optimization</h5>
                    <p>Improve your website&apos;s ability to convert visitors into customers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="service-section">
            <h2 className="service-section-title">Our Digital Marketing Approach</h2>
            <div className="service-step">
              <div className="service-step-number">1</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Research & Analysis</h5>
                <p>We conduct thorough market research, competitor analysis, and audience profiling to understand your unique position.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">2</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Strategy Development</h5>
                <p>We create a customized digital marketing strategy aligned with your business goals and target audience.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">3</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Campaign Execution</h5>
                <p>Our team implements the strategy across selected channels with compelling content and ads.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">4</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Monitoring & Optimization</h5>
                <p>We continuously track performance and make data-driven adjustments to maximize results.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Ready to Get Started?</h3>
            <p>Contact us today to discuss how our digital marketing services can help your business grow online.</p>
            <Link href="/contact" className="service-cta-button">
              Contact Us
            </Link>
          </div>

          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Success Stories</h3>
            <div className="mb-3 pb-3 border-bottom">
              <h5>E-commerce Retailer</h5>
              <p className="small">Increased online sales by 135% through targeted PPC campaigns and email marketing.</p>
            </div>
            <div className="mb-3 pb-3 border-bottom">
              <h5>SaaS Company</h5>
              <p className="small">Generated 200+ qualified leads per month through content marketing and social media.</p>
            </div>
            <div>
              <h5>Local Business</h5>
              <p className="small">Achieved 87% increase in foot traffic through local SEO and Google My Business optimization.</p>
            </div>
          </div>

          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Related Services</h3>
            <ul className="related-services-list">
              <li className="related-service-item">
                <Link href="/services/seo-optimization" className="related-service-link">
                  SEO Optimization
                </Link>
              </li>
              <li className="related-service-item">
                <Link href="/services/content-creation" className="related-service-link">
                  Content Creation
                </Link>
              </li>
              <li className="related-service-item">
                <Link href="/services/business-automation" className="related-service-link">
                  Business Automation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketingPage;
