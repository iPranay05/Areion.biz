'use client';
import { useEffect } from 'react';
import Link from 'next/link';

// Import the CSS for service cards
import '../../../public/assets/css/service-cards.css';

const ServicesPage = () => {
  // Add the CSS file to the document head
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/service-cards.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Our Services</h1>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <Link href="/services/business-automation" className="text-decoration-none">
            <div className="card service-card h-100">
              <div className="card-body">
                <h5 className="card-title">Business Automation</h5>
                <p className="card-text">Streamline your business operations with our automation solutions.</p>
                <div className="arrow-icon">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-md-4 mb-4">
          <Link href="/services/ecommerce-support" className="text-decoration-none">
            <div className="card service-card h-100">
              <div className="card-body">
                <h5 className="card-title">Ecommerce Support</h5>
                <p className="card-text">Get 24/7 support for your ecommerce business.</p>
                <div className="arrow-icon">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-md-4 mb-4">
          <Link href="/services/content-creation" className="text-decoration-none">
            <div className="card service-card h-100">
              <div className="card-body">
                <h5 className="card-title">Content Creation</h5>
                <p className="card-text">Engage your audience with compelling content.</p>
                <div className="arrow-icon">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-md-4 mb-4">
          <Link href="/services/realtime-support" className="text-decoration-none">
            <div className="card service-card h-100">
              <div className="card-body">
                <h5 className="card-title">Realtime Support</h5>
                <p className="card-text">Provide instant support to your customers.</p>
                <div className="arrow-icon">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-md-4 mb-4">
          <Link href="/services/digital-marketing" className="text-decoration-none">
            <div className="card service-card h-100">
              <div className="card-body">
                <h5 className="card-title">Digital Marketing</h5>
                <p className="card-text">Reach your target audience with precision.</p>
                <div className="arrow-icon">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-md-4 mb-4">
          <Link href="/services/seo-optimization" className="text-decoration-none">
            <div className="card service-card h-100">
              <div className="card-body">
                <h5 className="card-title">SEO Optimization</h5>
                <p className="card-text">Improve your search engine rankings and visibility.</p>
                <div className="arrow-icon">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
