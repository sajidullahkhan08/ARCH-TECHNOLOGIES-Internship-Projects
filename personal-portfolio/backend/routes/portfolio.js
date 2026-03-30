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

// ─── Helper: Create CRUD routes for singleton models (one document per type) ───
const createSingletonRoutes = (path, Model, defaults = {}) => {
  // GET — public
  router.get(path, async (req, res) => {
    try {
      let doc = await Model.findOne();
      if (!doc) {
        doc = new Model(defaults);
        await doc.save();
      }
      res.json(doc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // PUT — admin only
  router.put(path, authMiddleware, async (req, res) => {
    try {
      let doc = await Model.findOne();
      if (!doc) {
        doc = new Model();
      }
      // Only assign known schema fields (prevent mass-assignment)
      const allowedFields = Object.keys(Model.schema.paths).filter(
        f => !['_id', '__v', 'createdAt', 'updatedAt'].includes(f)
      );
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          doc[field] = req.body[field];
        }
      });
      await doc.save();
      res.json(doc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// ─── Helper: Create CRUD routes for collection models (multiple documents) ───
const createCollectionRoutes = (path, Model, sortField = 'createdAt') => {
  // GET all — public
  router.get(path, async (req, res) => {
    try {
      const docs = await Model.find().sort({ [sortField]: -1 });
      res.json(docs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // POST — admin only
  router.post(path, authMiddleware, async (req, res) => {
    try {
      const doc = new Model(req.body);
      await doc.save();
      res.status(201).json(doc);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // PUT — admin only
  router.put(`${path}/:id`, authMiddleware, async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!doc) {
        return res.status(404).json({ message: `${Model.modelName} not found` });
      }
      res.json(doc);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // DELETE — admin only
  router.delete(`${path}/:id`, authMiddleware, async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) {
        return res.status(404).json({ message: `${Model.modelName} not found` });
      }
      res.json({ message: `${Model.modelName} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// ─── Singleton routes (one document each) ───
createSingletonRoutes('/introduction', Introduction);
createSingletonRoutes('/background', Background, { education: [], certifications: [] });
createSingletonRoutes('/skills', Skills, { technical: [], soft: [], languages: [] });
createSingletonRoutes('/contact', Contact);

// ─── Collection routes (multiple documents) ───
createCollectionRoutes('/projects', Project);
createCollectionRoutes('/experience', Experience);
createCollectionRoutes('/testimonials', Testimonial);
createCollectionRoutes('/blog', Blog, 'publishedDate');
createCollectionRoutes('/achievements', Achievement, 'date');

module.exports = router;