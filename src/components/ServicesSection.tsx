'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ServicesSection = () => {
  // Define services data
  const services = [
    {
      id: 'business-automation',
      title: 'Business Automation',
      description: 'By streamlining repetitive tasks with business automation, you can free up your team\'s time for higher-level strategic thinking.',
      icon: '/assets/img/squares.png',
      link: '/services/business-automation'
    },
    {
      id: 'ecommerce-support',
      title: 'Ecommerce Support',
      description: 'Ecommerce support can empower your business to offer 24/7 assistance, improve customer satisfaction, and free up your staff to focus on complex issues.',
      icon: '/assets/img/shopping-cart.png',
      link: '/services/ecommerce-support'
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      description: 'A stellar content creation strategy fuels customer engagement, attracts new audiences, and positions your brand as a thought leader.',
      icon: '/assets/img/video-camera.png',
      link: '/services/content-creation'
    },
    {
      id: 'realtime-support',
      title: 'Realtime Support',
      description: 'Real-time support can significantly enhance customer satisfaction, reduce resolution times, and build lasting trust with your audience.',
      icon: '/assets/img/headphones.png',
      link: '/services/realtime-support'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'Digital marketing offers unparalleled targeting capabilities, allowing you to reach the right audience with the right message at the right time.',
      icon: '/assets/img/digital_marketing.png',
      link: '/services/digital-marketing'
    },
    {
      id: 'seo-optimization',
      title: 'SEO Optimization',
      description: 'SEO optimization is a long-term strategy that can deliver sustainable organic traffic, reducing your reliance on paid advertising.',
      icon: '/assets/img/SEO.png',
      link: '/services/seo-optimization'
    }
  ];
  
  // State to track which service card is being hovered
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  return (
    <section id="services" style={{
      background: "url(/assets/img/services-bg.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top",
      backgroundSize: "100px 80%"
    }}>
      <div className="container">
        <h5 className="section-subheading text-center">
          What we do
        </h5>
        <h2 className="section-heading text-center right left">
          Services to solve all kind of business problems
        </h2>
        <div className="services">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`service ${hoveredService === service.id ? 'service-hover' : ''}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="service__icon">
                <Image src={service.icon} alt={service.title} width={50} height={50} />
              </div>
              <h3 className="services__title">{service.title}</h3>
              <p className="service__text">{service.description}</p>
              <Link href={service.link} className="service-link">
                <div className="arrow-icon">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
