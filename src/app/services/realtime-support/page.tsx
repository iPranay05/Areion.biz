'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

const RealtimeSupportPage = () => {
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
        <h1 className="service-page-title">Realtime Support</h1>
        <div className="service-icon-container">
          <div className="service-icon-large">
            <Image src="/assets/img/headphones.png" alt="Realtime Support" width={80} height={80} />
          </div>
          <p className="service-page-description">
            Instant, personalized support for your customers when they need it most.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="service-section">
            <h2 className="service-section-title">Realtime Support Solutions</h2>
            <p>
              In today&apos;s fast-paced digital world, customers expect immediate assistance. Our realtime support solutions help you meet these expectations with:
            </p>
            <ul className="service-list">
              <li className="service-list-item">
                <div className="service-list-icon">💬</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">Live Chat Support</h5>
                  <p>Engage with your website visitors in real-time to answer questions and guide them through the purchase process.</p>
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">🤖</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">AI-Powered Chatbots</h5>
                  <p>Provide instant responses to common questions 24/7, even when your team is offline.</p>
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">📞</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">Voice Support</h5>
                  <p>Offer personalized phone support with minimal wait times for complex customer issues.</p>
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">📹</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">Video Support</h5>
                  <p>Solve technical problems faster with screen sharing and video calls for visual guidance.</p>
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">📱</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">In-App Support</h5>
                  <p>Integrate support directly into your mobile apps for a seamless customer experience.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="service-section">
            <h2 className="service-section-title">Benefits of Realtime Support</h2>
            <div className="row mt-4">
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">😊</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Improved Customer Satisfaction</h5>
                    <p>Resolve issues quickly and effectively, leading to happier customers and better reviews.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">🛒</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Higher Conversion Rates</h5>
                    <p>Address customer concerns in real-time to prevent cart abandonment and boost sales.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">👥</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Customer Retention</h5>
                    <p>Build stronger relationships with customers through personalized, timely support.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">📈</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Valuable Insights</h5>
                    <p>Gather real-time feedback to improve your products, services, and customer experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Ready to Get Started?</h3>
            <p>Contact us today to discuss how our realtime support solutions can help your business provide exceptional customer service.</p>
            <Link href="/contact" className="service-cta-button">
              Contact Us
            </Link>
          </div>

          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Our Approach</h3>
            <div className="service-step">
              <div className="service-step-number">1</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Assessment</h5>
                <p className="small">We evaluate your current support system and identify areas for improvement.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">2</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Strategy</h5>
                <p className="small">We develop a customized support strategy based on your business needs and customer expectations.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">3</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Implementation</h5>
                <p className="small">We set up and integrate the right support tools and train your team on best practices.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">4</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Optimization</h5>
                <p className="small">We continuously monitor and improve your support system based on performance data and feedback.</p>
              </div>
            </div>
          </div>

          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Related Services</h3>
            <ul className="related-services-list">
              <li className="related-service-item">
                <Link href="/services/ecommerce-support" className="related-service-link">
                  Ecommerce Support
                </Link>
              </li>
              <li className="related-service-item">
                <Link href="/services/business-automation" className="related-service-link">
                  Business Automation
                </Link>
              </li>
              <li className="related-service-item">
                <Link href="/services/digital-marketing" className="related-service-link">
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeSupportPage;
