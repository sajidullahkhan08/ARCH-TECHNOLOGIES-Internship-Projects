const mongoose = require('mongoose');

// Introduction Schema
const introductionSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  ambitions: { type: String, default: '' }
}, { timestamps: true });

// Background Schema
const backgroundSchema = new mongoose.Schema({
  education: [{
    degree: String,
    institution: String,
    year: String,
    description: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    year: String,
    credentialId: String
  }]
}, { timestamps: true });

// Projects Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  role: String,
  technologies: [String],
  outcomes: String,
  liveLink: String,
  githubLink: String,
  image: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

// Skills Schema
const skillsSchema = new mongoose.Schema({
  technical: [{
    category: String,
    skills: [String]
  }],
  soft: [String],
  languages: [String]
}, { timestamps: true });

// Experience Schema
const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  duration: { type: String, required: true },
  location: String,
  description: String,
  responsibilities: [String],
  contributions: [String],
  technologies: [String],
  current: { type: Boolean, default: false }
}, { timestamps: true });

// Testimonials Schema
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  company: String,
  testimonial: { type: String, required: true },
  image: String,
  linkedin: String
}, { timestamps: true });

// Blog/Articles Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  link: { type: String, required: true },
  publishedDate: Date,
  platform: String,
  tags: [String]
}, { timestamps: true });

// Achievements Schema
const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  issuer: String,
  category: String,
  image: String
}, { timestamps: true });

// Contact Schema
const contactSchema = new mongoose.Schema({
  email: String,
  phone: String,
  location: String,
  linkedin: String,
  github: String,
  website: String,
  twitter: String,
  availability: String
}, { timestamps: true });

// Export all models
module.exports = {
  Introduction: mongoose.model('Introduction', introductionSchema),
  Background: mongoose.model('Background', backgroundSchema),
  Project: mongoose.model('Project', projectSchema),
  Skills: mongoose.model('Skills', skillsSchema),
  Experience: mongoose.model('Experience', experienceSchema),
  Testimonial: mongoose.model('Testimonial', testimonialSchema),
  Blog: mongoose.model('Blog', blogSchema),
  Achievement: mongoose.model('Achievement', achievementSchema),
  Contact: mongoose.model('Contact', contactSchema)
};