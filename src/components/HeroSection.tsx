'use client';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section id="hero" className="container flex-row">
      <div className="hero__content">
        <h1 className="title">Work Smartly with Endless Possibilities</h1>
        <p className="text">
          Talk to our professionally trained business agent to grow your business.
        </p>
        <Link href="/chatbot" className="btn btn-primary">Chat with AI Assistant</Link>
      </div>
      <div className="hero__img">
        <Image src="/assets/img/Hero1.png" alt="Hero Image" width={600} height={500} />
      </div>
    </section>
  );
};

export default HeroSection;
