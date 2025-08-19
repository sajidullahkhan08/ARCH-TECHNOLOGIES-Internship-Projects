import React from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = ({ data = [] }) => {
  return (
    <section id="testimonials" className="testimonials-section section">
      <div className="container">
        <h2 className="section-title">What People Say</h2>
        
        {data.length === 0 ? (
          <div className="empty-state">
            <p>No testimonials added yet.</p>
          </div>
        ) : (
          <div className="testimonials-grid">
            {data.map((testimonial) => (
              <div key={testimonial._id} className="testimonial-card card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{testimonial.testimonial}</p>
                </div>
                
                <div className="testimonial-author">
                  <div className="author-image">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} />
                    ) : (
                      <div className="image-placeholder">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-position">
                      {testimonial.position}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                    {testimonial.linkedin && (
                      <a 
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-link"
                      >
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;