import React from 'react';
import './AchievementsSection.css';

const AchievementsSection = ({ data = [] }) => {
  const AchievementCard = ({ achievement }) => (
    <div className="achievement-card card">
      <div className="achievement-content">
        <h4 className="achievement-title">{achievement.title}</h4>
        
        {achievement.issuer && (
          <p className="achievement-issuer">
            <strong>Issued by:</strong> {achievement.issuer}
          </p>
        )}
        
        {achievement.date && (
          <p className="achievement-date">
            <strong>Date:</strong> {new Date(achievement.date).toLocaleDateString()}
          </p>
        )}
        
        {achievement.category && (
          <p className="achievement-category">
            <strong>Category:</strong> {achievement.category}
          </p>
        )}
        
        {achievement.description && (
          <p className="achievement-description">{achievement.description}</p>
        )}
        
        {achievement.image && (
          <div className="achievement-image">
            <img src={achievement.image} alt={achievement.title} />
          </div>
        )}
      </div>
    </div>
  );

  const groupAchievementsByCategory = (achievements) => {
    const grouped = {};
    achievements.forEach(achievement => {
      const category = achievement.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(achievement);
    });
    return grouped;
  };

  const groupedAchievements = groupAchievementsByCategory(data);

  return (
    <section id="achievements" className="achievements-section section">
      <div className="container">
        <h2 className="section-title">Achievements & Awards</h2>
        
        {data.length === 0 ? (
          <div className="empty-state">
            <p>No achievements added yet.</p>
          </div>
        ) : (
          <div className="achievements-container">
            {Object.entries(groupedAchievements).map(([category, achievements]) => (
              <div key={category} className="achievement-category">
                <h3 className="subsection-title">{category}</h3>
                <div className="achievements-grid">
                  {achievements.map(achievement => (
                    <AchievementCard key={achievement._id} achievement={achievement} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection;
