import React from 'react';
import './BackgroundSection.css';

const BackgroundSection = ({ data }) => {
  const { education = [], certifications = [] } = data || {};

  return (
    <section id="background" className="background-section section">
      <div className="container">
        <h2 className="section-title">Background</h2>
        
        <div className="background-content">
          {/* Education */}
          <div className="background-subsection">
            <h3 className="subsection-title">🎓 Education</h3>
            {education.length === 0 ? (
              <p className="empty-state">No education information added yet.</p>
            ) : (
              <div className="education-list">
                {education.map((edu, index) => (
                  <div key={index} className="education-item card">
                    <h4 className="education-degree">{edu.degree}</h4>
                    <p className="education-institution">{edu.institution}</p>
                    <p className="education-year">{edu.year}</p>
                    {edu.description && (
                      <p className="education-description">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="background-subsection">
            <h3 className="subsection-title">📜 Certifications</h3>
            {certifications.length === 0 ? (
              <p className="empty-state">No certifications added yet.</p>
            ) : (
              <div className="certifications-list">
                {certifications.map((cert, index) => (
                  <div key={index} className="certification-item card">
                    <h4 className="certification-name">{cert.name}</h4>
                    <p className="certification-issuer">{cert.issuer}</p>
                    <p className="certification-year">{cert.year}</p>
                    {cert.credentialId && (
                      <p className="certification-id">Credential ID: {cert.credentialId}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;