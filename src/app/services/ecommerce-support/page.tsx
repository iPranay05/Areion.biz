'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

const EcommerceSupportPage = () => {
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
        <h1 className="service-page-title">Ecommerce Support</h1>
        <div className="service-icon-container">
          <div className="service-icon-large">
            <Image src="/assets/img/shopping-cart.png" alt="Ecommerce Support" width={80} height={80} />
          </div>
          <p className="service-page-description">
            24/7 support for your online store to ensure smooth operations and happy customers.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="service-section">
            <h2 className="service-section-title">Comprehensive Ecommerce Support Solutions</h2>
            <p>
              Running an online store requires constant attention and quick responses to customer inquiries and technical issues. Our ecommerce support services provide:
            </p>
            <ul className="service-list">
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">24/7 customer service via chat, email, and phone</div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">Technical troubleshooting for your online store</div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">Order management and fulfillment assistance</div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">Returns and refunds processing</div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">Inventory management and stock alerts</div>
              </li>
            </ul>
          </div>

          <div className="service-section">
            <h2 className="service-section-title">Why Choose Our Ecommerce Support</h2>
            <div className="row mt-4">
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">⏰</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Always Available</h5>
                    <p>Round-the-clock support ensures your customers are never left waiting.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">👥</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Expert Team</h5>
                    <p>Our support specialists are trained in ecommerce best practices.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">⚡</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Fast Response Times</h5>
                    <p>We aim to respond to all inquiries within minutes, not hours.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="service-list-item" style={{height: '100%', padding: '15px'}}>
                  <div className="service-list-icon">📈</div>
                  <div className="service-list-content">
                    <h5 className="service-list-title">Data-Driven Insights</h5>
                    <p>Regular reports on customer issues to help improve your store.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Ready to Get Started?</h3>
            <p>Contact us today to discuss how our ecommerce support services can help your online business thrive.</p>
            <Link href="/contact" className="service-cta-button">
              Contact Us
            </Link>
          </div>

          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Support Packages</h3>
            <div className="mb-3 pb-3 border-bottom">
              <h5>Basic Support</h5>
              <p className="small">Email support during business hours with 24-hour response time.</p>
              <p className="fw-bold mb-0">Starting at $499/month</p>
            </div>
            <div className="mb-3 pb-3 border-bottom">
              <h5>Standard Support</h5>
              <p className="small">Email and chat support with 4-hour response time, 7 days a week.</p>
              <p className="fw-bold mb-0">Starting at $999/month</p>
            </div>
            <div className="p-3">
              <h5>Premium Support</h5>
              <p className="small">24/7 email, chat, and phone support with 30-minute response time.</p>
              <p className="fw-bold mb-0">Starting at $1,999/month</p>
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

export default EcommerceSupportPage;
