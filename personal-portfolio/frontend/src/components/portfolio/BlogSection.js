import React from 'react';
import './BlogSection.css';

const BlogSection = ({ data = [] }) => {
  return (
    <section id="blog" className="blog-section section">
      <div className="container">
        <h2 className="section-title">Blog & Articles</h2>
        
        {data.length === 0 ? (
          <div className="empty-state">
            <p>No blog articles added yet.</p>
          </div>
        ) : (
          <div className="blog-grid">
            {data.map((article) => (
              <article key={article._id} className="blog-card card">
                <div className="blog-header">
                  <h3 className="blog-title">
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </h3>
                  
                  <div className="blog-meta">
                    {article.platform && (
                      <span className="blog-platform">{article.platform}</span>
                    )}
                    {article.publishedDate && (
                      <span className="blog-date">
                        {new Date(article.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                </div>
                
                {article.summary && (
                  <p className="blog-summary">{article.summary}</p>
                )}
                
                {article.tags.length > 0 && (
                  <div className="blog-tags">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                )}
                
                <div className="blog-actions">
                  <a 
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-small"
                  >
                    Read Article →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;