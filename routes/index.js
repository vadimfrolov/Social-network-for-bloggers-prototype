const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');
// const Status = require('../models/status');


const router = express.Router();
// route for Home-Page
router.get('/', sessionChecker, (req, res) => {
  res.redirect('/login');
});

// route for user signup
router.route('/signup')
  .get(sessionChecker, (req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      await user.save();
      req.session.user = user;
      res.redirect('/main/');
    }
    catch (error) {
      res.redirect('/signup');
    };
  });


// route for user Login
router.route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {

    const {username, password} = req.body;
    const user = await User.findOne({ username });

    console.log(user)

    if (!user) {
      res.redirect('/login');
      // } else if (!user.validPassword(password)) {
    } else if (user.password !== password) {
      res.redirect('/login');
    } else {
      req.session.user = user;
      res.redirect('/main');
    }

  });

  
  // route for user's dashboard
  router.get('/main', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.render('main');
    } else {
      res.redirect('/login');
    }
  });
  
  router.get('/map', (req, res) => {
    res.render('map')
  })

  router.route('/newstatus')
    .get((req, res) => {
      res.render('newstatus')
    })
    .post( async (req, res) => {
      const post = new Status({ 
        status: req.body.status, 
        text: req.body.text, 
        price: req.body.price 
      })
      await Post.create(post)
      console.log(post);
    })




// route for user logout
router.get('/logout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      // res.clearCookie('user_sid');
      await req.session.destroy();
      res.redirect('/');
    }
    catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/about', (req, res) => {
  res.render('about')
})



module.exports = router;
