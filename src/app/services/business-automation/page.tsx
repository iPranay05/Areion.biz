'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

const BusinessAutomationPage = () => {
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
        <h1 className="service-page-title">Business Automation</h1>
        <div className="service-icon-container">
          <div className="service-icon-large">
            <Image src="/assets/img/squares.png" alt="Business Automation" width={80} height={80} />
          </div>
          <p className="service-page-description">
            Streamline your operations and boost productivity with our cutting-edge automation solutions.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="service-section">
            <h2 className="service-section-title">How Business Automation Can Transform Your Company</h2>
            <p>
              By streamlining repetitive tasks with business automation, you can free up your team&apos;s time for higher-level strategic thinking. Our automation solutions help you:
            </p>
            <ul className="service-list">
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">Reduce manual data entry and processing by up to 90%</div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">Minimize errors and inconsistencies in your workflows</div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">Accelerate approval processes and decision-making</div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">Improve customer experience through faster response times</div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">Generate comprehensive reports and analytics automatically</div>
              </li>
            </ul>
          </div>

          <div className="service-section">
            <h2 className="service-section-title">Our Automation Approach</h2>
            <p>
              We take a holistic approach to business automation, focusing on your specific needs and goals. Our process includes:
            </p>
            <div className="service-step">
              <div className="service-step-number">1</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Process Analysis</h5>
                <p>We thoroughly analyze your current workflows to identify bottlenecks and opportunities for automation.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">2</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Solution Design</h5>
                <p>Our experts design custom automation solutions tailored to your specific business requirements.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">3</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Implementation</h5>
                <p>We implement the automation solutions with minimal disruption to your ongoing operations.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">4</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Training & Support</h5>
                <p>We provide comprehensive training and ongoing support to ensure your team can maximize the benefits of automation.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Ready to Get Started?</h3>
            <p>Contact us today to discuss how business automation can transform your operations.</p>
            <Link href="#contact" className="service-cta-button">
              Contact Us
            </Link>
          </div>

          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Success Stories</h3>
            <div className="mb-3 pb-3 border-bottom">
              <h5>Manufacturing Company</h5>
              <p className="small">Reduced processing time by 75% and eliminated manual errors in inventory management.</p>
            </div>
            <div className="mb-3 pb-3 border-bottom">
              <h5>Financial Services Firm</h5>
              <p className="small">Automated client onboarding process, reducing time from 2 weeks to 2 days.</p>
            </div>
            <div>
              <h5>Healthcare Provider</h5>
              <p className="small">Streamlined patient scheduling and billing, improving satisfaction scores by 40%.</p>
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
                <Link href="/services/content-creation" className="related-service-link">
                  Content Creation
                </Link>
              </li>
              <li className="related-service-item">
                <Link href="/services/realtime-support" className="related-service-link">
                  Realtime Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAutomationPage;
