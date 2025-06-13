'use client';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
// CSS is imported in the global stylesheet

const ContactSection = () => {
  // Initialize EmailJS (optional - can also be done in a _app.js or layout.js file)
  useEffect(() => {
    // This is optional if you've already initialized EmailJS elsewhere
    // emailjs.init("YOUR_PUBLIC_KEY");
  }, []);
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null as string | null }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));

    
    const serviceId = 'YOUR_SERVICE_ID'; 
    const templateId = 'YOUR_TEMPLATE_ID'; 
    const publicKey = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Message sent successfully!' as string }
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: 'Something went wrong. Please try again later.' as string }
        });
      });
  };

  return (
    <section id="contact" className="contact-top" style={{ 
      background: "url(/assets/img/contact-bg.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      backgroundSize: "contain",
    }}>
      <div className="container">
        <h5 className="section-subheading text-center">
          contact us
        </h5>
        <h2 className="section-heading text-center left right">Stay connected with us for any reason</h2>
        <div className="contact">
          {/*Form*/}
          <div className="contact__details">
            <p className="text">
              Ready to grow your business together? Contact us today!
            </p>

            <div className="details">
              <div className="detail">
                <div className="detail__icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="detail__content">
                  <h3>Phone</h3>
                  <p>(+91) 9967-117-793</p>
                </div>
              </div>

              <div className="detail">
                <div className="detail__icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="detail__content">
                  <h3>Email</h3>
                  <p>business@areion.biz</p>
                </div>
              </div>

              <div className="detail">
                <div className="detail__icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="detail__content">
                  <h3>Address</h3>
                  <p>Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__form">
            {status.info.msg && (
              <div className={`form-message ${status.info.error ? 'error' : 'success'}`}>
                {status.info.msg}
              </div>
            )}
            <form ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  required 
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Your Message" 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={status.submitting}
              >
                {status.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
