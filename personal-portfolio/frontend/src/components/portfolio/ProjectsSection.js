import React from 'react';
import './ProjectsSection.css';

const ProjectsSection = ({ data = [] }) => {
  const featuredProjects = data.filter(project => project.featured);
  const otherProjects = data.filter(project => !project.featured);

  const ProjectCard = ({ project }) => (
    <div className="project-card card">
      {project.image && (
        <div className="project-image">
          <img src={project.image} alt={project.title} />
        </div>
      )}
      <div className="project-content">
        <h4 className="project-title">{project.title}</h4>
        <p className="project-description">{project.description}</p>
        
        {project.role && (
          <p className="project-role">
            <strong>Role:</strong> {project.role}
          </p>
        )}

        {project.technologies.length > 0 && (
          <div className="project-technologies">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}

        {project.outcomes && (
          <div className="project-outcomes">
            <strong>Outcomes:</strong>
            <p>{project.outcomes}</p>
          </div>
        )}

        <div className="project-links">
          {project.liveLink && (
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-small"
            >
              Live Demo
            </a>
          )}
          {project.githubLink && (
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary btn-small"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
      {project.featured && <div className="featured-badge">Featured</div>}
      
    </div>
  );

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        
        {data.length === 0 ? (
          <div className="empty-state">
            <p>No projects added yet.</p>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div className="featured-projects">
                <h3 className="subsection-title">Featured Projects</h3>
                <div className="projects-grid featured-grid">
                  {featuredProjects.map(project => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <div className="other-projects">
                {featuredProjects.length > 0 && (
                  <h3 className="subsection-title">Other Projects</h3>
                )}
                <div className="projects-grid">
                  {otherProjects.map(project => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;