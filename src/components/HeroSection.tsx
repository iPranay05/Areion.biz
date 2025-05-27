'use client';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section id="hero" className="container flex-row">
      <div className="hero__content">
        <h1 className="title">Work Smartly with Endless Possibilities</h1>
        <p className="text">
          Grow your presence | Get more leads | Increase sales.
        </p>
        <Link href="#services" className="btn btn-primary">Get Started</Link>
      </div>
      <div className="hero__img">
        <Image src="/assets/img/hero1.png" alt="Hero Image" width={600} height={500} />
      </div>
    </section>
  );
};

export default HeroSection;
