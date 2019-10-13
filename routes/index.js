const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');
const Status = require('../models/status');


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
        password: req.body.password,
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

    const { username, password } = req.body;
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
  router.get('/main', async (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      let status = await Status.find();

      // console.log(req.session);
    
      res.render('main', {status});
    } else {
      res.redirect('/login');
    }
  });
  
  router.get('/map', (req, res) => {
    res.render('map')
  })

  router.get('/chat', (req, res) => {
    res.render('chat')
  })

  router.route('/newstatus')
    .get((req, res) => {
      console.log(req.session.user._id);
      
      res.render('newstatus')
    })
    .post( async (req, res) => {

      const post = new Status({ 
        // status: req.body.status, 
        text: req.body.status, 
        userName: req.session.user.username ,
        price: req.body.price,
        date: new Date(),
        userId: req.session.user._id,
      })
      await Status.create(post)
      console.log(post);
      // console.log(req.session.user.username);
      
      res.redirect('/main')
    })

router.get('/profile/:id', async (req, res) => {
  let user = await User.findById(req.params.id)
  console.log(user);
  
  res.render('profile')
})

router.delete('/delete/:id', async (req, res) => {
  let status = await Status.findById(req.params.id);
  
  if (status.userId === req.session.user._id){
    const post = await Status.findByIdAndDelete({ _id: req.params.id })
    res.json(post)
    return res.redirect('/main');
    // await Status.deleteOne({'_id': req.params.id});
  }
  // res.redirect('/main')


})

router.route('/edit/:id')
  .get(async (req, res) => {
    let status = await Status.findById(req.params.id);

    if (status.userId === req.session.user._id){
      res.render('editstatus', {status})
      // await Status.deleteOne({'_id': req.params.id});
    } else {
      res.redirect('/main')
    }
  })
  .post(async (req, res) => {
    // console.log(req.body);
    await Status.updateOne({_id: req.params.id}, {text: req.body.text, price: req.body.price});
    const stat = await Status.findById(req.params.id)
    console.log(stat);
    
    res.redirect('/main')
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
