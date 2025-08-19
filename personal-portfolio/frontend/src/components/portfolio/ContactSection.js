import React from 'react';
import './ContactSection.css';

const ContactSection = ({ data }) => {
  const {
    email,
    phone,
    location,
    linkedin,
    github,
    website,
    twitter,
    availability
  } = data || {};

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>I'm always open to discussing new opportunities, interesting projects, or just having a great conversation about technology.</p>
            
            {availability && (
              <div className="availability-status">
                <span className="status-indicator"></span>
                {availability}
              </div>
            )}

            <div className="contact-details">
              {email && (
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <strong>Email</strong>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                </div>
              )}

              {phone && (
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <div>
                    <strong>Phone</strong>
                    <a href={`tel:${phone}`}>{phone}</a>
                  </div>
                </div>
              )}

              {location && (
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <strong>Location</strong>
                    <span>{location}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="social-links">
            <h3>Connect With Me</h3>
            <div className="social-grid">
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <span className="social-icon">💼</span>
                  <div>
                    <strong>LinkedIn</strong>
                    <span>Professional Profile</span>
                  </div>
                </a>
              )}

              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="social-link github">
                  <span className="social-icon">💻</span>
                  <div>
                    <strong>GitHub</strong>
                    <span>View My Code</span>
                  </div>
                </a>
              )}

              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className="social-link website">
                  <span className="social-icon">🌐</span>
                  <div>
                    <strong>Website</strong>
                    <span>Personal Site</span>
                  </div>
                </a>
              )}

              {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                  <span className="social-icon">🐦</span>
                  <div>
                    <strong>Twitter</strong>
                    <span>Follow Me</span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;