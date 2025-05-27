'use client';
import Link from 'next/link';

const PacksSection = () => {
  return (
    <section id="packs" style={{
      background: "url(/assets/img/packs-bg.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "100% 100%",
      backgroundAttachment: "fixed"
    }}>
      <div className="container">
        <h5 className="section-subheading text-center">our Packs & Portfolio
        </h5>
        <h2 className="section-heading text-center right left">Check the real innovation</h2>
        
        <div className="packs">
          <div className="pack">
            <div className="pack__icon">
              <i className="fas fa-rocket"></i>
            </div>
            <h3 className="pack__title">Starter Pack</h3>
            <p className="pack__description">Perfect for small businesses just starting their digital journey.</p>
            <Link href="/packs" className="btn btn-primary">Learn More</Link>
          </div>
          
          <div className="pack">
            <div className="pack__icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="pack__title">Growth Pack</h3>
            <p className="pack__description">Designed for businesses ready to scale their online presence.</p>
            <Link href="/packs" className="btn btn-primary">Learn More</Link>
          </div>
          
          <div className="pack">
            <div className="pack__icon">
              <i className="fas fa-crown"></i>
            </div>
            <h3 className="pack__title">Enterprise Pack</h3>
            <p className="pack__description">Comprehensive solutions for established businesses with complex needs.</p>
            <Link href="/packs" className="btn btn-primary">Learn More</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PacksSection;
