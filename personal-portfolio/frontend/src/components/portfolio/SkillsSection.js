import React from 'react';
import './SkillsSection.css';

const SkillsSection = ({ data }) => {
  const { technical = [], soft = [], languages = [] } = data || {};

  return (
    <section id="skills" className="skills-section section">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="skills-content">
          {/* Technical Skills */}
          {technical.length > 0 && (
            <div className="skills-category">
              <h3 className="category-title">🛠️ Technical Skills</h3>
              <div className="technical-skills">
                {technical.map((category, index) => (
                  <div key={index} className="skill-category-item card">
                    <h4 className="skill-category-name">{category.category}</h4>
                    <div className="skills-list">
                      {category.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="skill-tag technical">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {soft.length > 0 && (
            <div className="skills-category">
              <h3 className="category-title">💡 Soft Skills</h3>
              <div className="soft-skills card">
                <div className="skills-list">
                  {soft.map((skill, index) => (
                    <span key={index} className="skill-tag soft">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="skills-category">
              <h3 className="category-title">🌍 Languages</h3>
              <div className="languages-skills card">
                <div className="skills-list">
                  {languages.map((language, index) => (
                    <span key={index} className="skill-tag language">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {technical.length === 0 && soft.length === 0 && languages.length === 0 && (
            <div className="empty-state">
              <p>No skills information added yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;