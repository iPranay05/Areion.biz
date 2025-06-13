'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

const SEOOptimizationPage = () => {
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
        <h1 className="service-page-title">SEO Optimization</h1>
        <div className="service-icon-container">
          <div className="service-icon-large">
            <Image src="/assets/img/SEO.png" alt="SEO Optimization" width={80} height={80} />
          </div>
          <p className="service-page-description">
            Boost your online visibility and drive organic traffic with our expert SEO services.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="service-section">
            <h2 className="service-section-title">Comprehensive SEO Services</h2>
            <p>
              Our SEO experts use proven strategies to improve your search engine rankings and drive targeted organic traffic to your website. Our services include:
            </p>
            <ul className="service-list">
              <li className="service-list-item">
                <div className="service-list-icon">🔍</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">Technical SEO Audit</h5>
                  <p>Comprehensive analysis of your website&apos;s technical aspects to identify and fix issues affecting search performance.</p>
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">⌨️</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">Keyword Research & Strategy</h5>
                  <p>Identifying high-value keywords that your target audience is searching for to drive relevant traffic.</p>
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">📄</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">On-Page SEO Optimization</h5>
                  <p>Optimizing your website content, meta tags, headings, and internal linking structure for better search visibility.</p>
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">🔗</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">Off-Page SEO & Link Building</h5>
                  <p>Building high-quality backlinks from reputable websites to increase your domain authority.</p>
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">📍</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">Local SEO</h5>
                  <p>Optimizing your online presence to attract more business from relevant local searches.</p>
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">📈</div>
                <div className="service-list-content">
                  <h5 className="service-list-title">SEO Analytics & Reporting</h5>
                  <p>Regular performance reports with actionable insights to continuously improve your search rankings.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="service-section">
            <h2 className="service-section-title">Our SEO Process</h2>
            <div className="service-step">
              <div className="service-step-number">1</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Discovery & Audit</h5>
                <p>We analyze your current SEO performance, identify issues, and assess your competition to establish a baseline.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">2</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Strategy Development</h5>
                <p>We create a customized SEO strategy based on your business goals, target audience, and competitive landscape.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">3</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Implementation</h5>
                <p>Our team executes the strategy, making technical improvements, optimizing content, and building quality backlinks.</p>
              </div>
            </div>
            <div className="service-step">
              <div className="service-step-number">4</div>
              <div className="service-step-content">
                <h5 className="service-step-title">Monitoring & Refinement</h5>
                <p>We continuously track your rankings, traffic, and conversions, making data-driven adjustments to improve results.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Ready to Get Started?</h3>
            <p>Contact us today for a free SEO audit and discover how we can help improve your search rankings.</p>
            <Link href="/contact" className="service-cta-button">
              Contact Us
            </Link>
          </div>

          <div className="service-sidebar-card">
            <h3 className="service-sidebar-title">Why Choose Our SEO Services</h3>
            <ul className="service-list">
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">
                  Data-driven strategies tailored to your business goals
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">
                  Transparent reporting and clear communication
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">
                  White-hat techniques that comply with search engine guidelines
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">
                  Focus on sustainable, long-term results
                </div>
              </li>
              <li className="service-list-item">
                <div className="service-list-icon">✓</div>
                <div className="service-list-content">
                  Experienced SEO specialists with proven track records
                </div>
              </li>
            </ul>
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

export default SEOOptimizationPage;
