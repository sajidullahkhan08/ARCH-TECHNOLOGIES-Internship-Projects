import React from 'react';
import './IntroductionSection.css';

const IntroductionSection = ({ data }) => {
  const { name, title, description, profileImage, ambitions } = data || {};

  return (
    <section id="introduction" className="introduction-section">
      <div className="container">
        <div className="introduction-content">
          <div className="introduction-text">
            <h1 className="introduction-name">{name || "Your Name"}</h1>
            <h2 className="introduction-title">{title || "Professional Title"}</h2>
            <p className="introduction-description">
              {description || "Welcome to my portfolio. I'm passionate about creating exceptional digital experiences."}
            </p>
            {ambitions && (
              <div className="introduction-ambitions">
                <h3>My Ambitions</h3>
                <p>{ambitions}</p>
              </div>
            )}
            <div className="introduction-actions">
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary"
              >
                Get In Touch
              </button>
              <button 
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-secondary"
              >
                View My Work
              </button>
            </div>
          </div>
          <div className="introduction-image">
            {profileImage ? (
              <img src={profileImage} alt={name || "Profile"} />
            ) : (
              <div className="image-placeholder">
                <span>👤</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;