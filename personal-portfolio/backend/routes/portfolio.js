const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  Introduction,
  Background,
  Project,
  Skills,
  Experience,
  Testimonial,
  Blog,
  Achievement,
  Contact
} = require('../models/Portfolio');

const router = express.Router();

// Introduction routes
router.get('/introduction', async (req, res) => {
  try {
    let introduction = await Introduction.findOne();
    if (!introduction) {
      introduction = new Introduction();
      await introduction.save();
    }
    res.json(introduction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/introduction', authMiddleware, async (req, res) => {
  try {
    let introduction = await Introduction.findOne();
    if (!introduction) {
      introduction = new Introduction();
    }
    
    Object.assign(introduction, req.body);
    await introduction.save();
    res.json(introduction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Background routes
router.get('/background', async (req, res) => {
  try {
    let background = await Background.findOne();
    if (!background) {
      background = new Background({ education: [], certifications: [] });
      await background.save();
    }
    res.json(background);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/background', authMiddleware, async (req, res) => {
  try {
    let background = await Background.findOne();
    if (!background) {
      background = new Background();
    }
    
    Object.assign(background, req.body);
    await background.save();
    res.json(background);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Projects routes
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/projects', authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Skills routes
router.get('/skills', async (req, res) => {
  try {
    let skills = await Skills.findOne();
    if (!skills) {
      skills = new Skills({ technical: [], soft: [], languages: [] });
      await skills.save();
    }
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/skills', authMiddleware, async (req, res) => {
  try {
    let skills = await Skills.findOne();
    if (!skills) {
      skills = new Skills();
    }
    
    Object.assign(skills, req.body);
    await skills.save();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Experience routes
router.get('/experience', async (req, res) => {
  try {
    const experience = await Experience.find().sort({ createdAt: -1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/experience', authMiddleware, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/experience/:id', authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/experience/:id', authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Testimonials routes
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/testimonials', authMiddleware, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Blog routes
router.get('/blog', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedDate: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/blog', authMiddleware, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/blog/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/blog/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Achievements routes
router.get('/achievements', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/achievements', authMiddleware, async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/achievements/:id', authMiddleware, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/achievements/:id', authMiddleware, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Contact routes
router.get('/contact', async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact();
      await contact.save();
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/contact', authMiddleware, async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact();
    }
    
    Object.assign(contact, req.body);
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;