const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'create_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'create_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(postData => {
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  })
  .catch(err => res.status(500).json(err));
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'content', 'title', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(postData => {
    if (!postData) {
      res.status(404).json({ message: 'No post found with this ID!' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('single-post', { post, loggedIn: req.session.loggedIn });
  })
  .catch(err => res.status(500).json(err));
});

router.get('/posts-comments', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'content', 'title', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(postData => {
    if (!postData) {
      res.status(404).json({ message: 'No post found with this ID!' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
  })
  .catch(err => res.status(500).json(err));
});

module.exports = router;