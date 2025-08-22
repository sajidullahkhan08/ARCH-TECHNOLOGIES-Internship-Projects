import React from 'react';
import './ExperienceSection.css';

const ExperienceSection = ({ data = [] }) => {
  return (
    <section id="experience" className="experience-section section">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        
        {data.length === 0 ? (
          <div className="empty-state">
            <p>No work experience added yet.</p>
          </div>
        ) : (
          <div className="experience-timeline">
            {data.map((experience, index) => (
              <div key={experience._id} className="experience-item">
                <div className="experience-card card">
                  <div className="experience-header">
                    <h3 className="experience-position">{experience.position}</h3>
                    <div className="experience-meta">
                      <p className="experience-company">{experience.company}</p>
                      <p className="experience-duration">{experience.duration}</p>
                      {experience.location && (
                        <p className="experience-location">📍 {experience.location}</p>
                      )}
                      {experience.current && (
                        <span className="current-badge">Current</span>
                      )}
                    </div>
                  </div>
                  
                  {experience.description && (
                    <p className="experience-description">{experience.description}</p>
                  )}

                  {experience.responsibilities.length > 0 && (
                    <div className="experience-section">
                      <h4>Key Responsibilities</h4>
                      <ul className="experience-list">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <li key={idx}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {experience.contributions.length > 0 && (
                    <div className="experience-section">
                      <h4>Key Contributions</h4>
                      <ul className="experience-list contributions">
                        {experience.contributions.map((contribution, idx) => (
                          <li key={idx}>{contribution}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {experience.technologies.length > 0 && (
                    <div className="experience-technologies">
                      <h4>Technologies Used</h4>
                      <div className="tech-tags">
                        {experience.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {index < data.length - 1 && <div className="timeline-connector"></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;