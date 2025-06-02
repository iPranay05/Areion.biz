'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Zon CollabHub",
      job: "",
      image: "/assets/img/zchlogo.png",
      testimonial:
        "Areion's creativity skyrocketed our engagement! They turned followers into fans.",
    },
    {
      name: "360 The Garage",
      job: "",
      image: "/assets/img/360logo.png",
      testimonial:
        "Their real-time support is a game-changer. Customers rave about the responsive service.",
    },
    {
      name: "Zon Secure Solutions",
      job: "",
      image: "/assets/img/ZSSLOGO.png",
      testimonial:
        "We finally saw results. Areion's targeted content drove sales and brand awareness.",
    },
    {
      name: "The Cititor",
      job: "",
      image: "/assets/img/CititorLogo.png",
      testimonial:
        "From concept to execution, they handled it all. A stress-free experience with impressive results!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <div className="testimonials-wrapper">
      <section id="testimonial" className="container">
        <h5 className="section-subheading text-center">Testimonials</h5>
        <h2 className="section-heading text-center right left">What Client Says</h2>
      </section>

      <div className="testimonials-container">
        <div className="testimonial-card">
          <p>&quot;{testimonials[currentIndex].testimonial}&quot;</p>
          <div className="testimonial-image-container">
            <Image 
              src={testimonials[currentIndex].image} 
              alt={testimonials[currentIndex].name} 
              width={80} 
              height={80} 
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <h3>{testimonials[currentIndex].name}</h3>
          {testimonials[currentIndex].job && <h6>{testimonials[currentIndex].job}</h6>}
        </div>
        <button className="prev-btn" onClick={prevTestimonial} aria-label="Previous testimonial">&lt;</button>
        <button className="next-btn" onClick={nextTestimonial} aria-label="Next testimonial">&gt;</button>
      </div>
    </div>
  );
};

export default TestimonialsSection;
