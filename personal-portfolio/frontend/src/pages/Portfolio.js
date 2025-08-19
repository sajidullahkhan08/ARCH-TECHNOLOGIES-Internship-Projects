import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntroductionSection from '../components/portfolio/IntroductionSection';
import BackgroundSection from '../components/portfolio/BackgroundSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import TestimonialsSection from '../components/portfolio/TestimonialsSection';
import BlogSection from '../components/portfolio/BlogSection';
import AchievementsSection from '../components/portfolio/AchievementsSection';
import ContactSection from '../components/portfolio/ContactSection';
import './Portfolio.css';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [
        introduction,
        background,
        projects,
        skills,
        experience,
        testimonials,
        blog,
        achievements,
        contact
      ] = await Promise.all([
        axios.get('/introduction'),
        axios.get('/background'),
        axios.get('/projects'),
        axios.get('/skills'),
        axios.get('/experience'),
        axios.get('/testimonials'),
        axios.get('/blog'),
        axios.get('/achievements'),
        axios.get('/contact')
      ]);

      setData({
        introduction: introduction.data,
        background: background.data,
        projects: projects.data,
        skills: skills.data,
        experience: experience.data,
        testimonials: testimonials.data,
        blog: blog.data,
        achievements: achievements.data,
        contact: contact.data
      });
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading portfolio...</div>;
  }

  return (
    <div className="portfolio">
      <IntroductionSection data={data.introduction} />
      <BackgroundSection data={data.background} />
      <ProjectsSection data={data.projects} />
      <SkillsSection data={data.skills} />
      <ExperienceSection data={data.experience} />
      <TestimonialsSection data={data.testimonials} />
      <BlogSection data={data.blog} />
      <AchievementsSection data={data.achievements} />
      <ContactSection data={data.contact} />
    </div>
  );
};

export default Portfolio;