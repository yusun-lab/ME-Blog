const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;


/* 
  * Check Login
*/
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' }); /* ??? */
  }
  
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}



/* 
  * GET /
  * Admin - Login Page
*/

router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: 'Admin',
      description: 'Simple Blog built with Node.js, Express and MongoDB',
    };

    res.render('admin/index', { locals, layout: adminLayout });
  }
  catch (error) {
    console.error(error);
  }
});


/* 
  * POST /
  * Admin - Check Login
*/
router.post('/admin', async (req, res) => {
  try {
    
    const { username, password} = req.body;
  
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json( {message: 'Invalid credentials'} );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json( {message: 'Invalid credentials'} );
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret );
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');

    
    
  }
  catch (error) {
    console.error(error);
  }
});

/* 
  * GET /
  * Admin - Dashboard
*/
router.get('/dashboard', authMiddleware, async (req, res) => {

  res.render('admin/dashboard');

});

// router.post('/admin', async (req, res) => {
//   try {
    
//     const { username, password} = req.body;
  
//     if(req.body.username === 'admin'  && req.body.password === 'password') {
//       res.send('You are logged in!');
//     } else {
//       res.send('Wrong username or password!');
//     }
    
//   }
//   catch (error) {
//     console.error(error);
//   }
// });

/* 
  * POST /
  * Admin - Register
*/
router.post('/register', async (req, res) => {
  try {
    const { username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    

    try {
      const user = await User.create({ username, password:hashedPassword });
      res.status(201).json({ message: 'User Created', user });
    } catch (error) {
      if(error.code === 11000) {
        res.status(409).json({ message: 'Username already in use' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }



    
  }
  catch (error) {
    console.error(error);
  }
});


module.exports = router;
