const express = require('express');
const router = express.Router();

// Routes 
router.get('/', (req, res) => {
  const locals = {
    title: 'Node.js Blog',
    description: 'Simple Blog built with Node.js, Express and MongoDB',
  };


  res.render('index', { locals });
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;