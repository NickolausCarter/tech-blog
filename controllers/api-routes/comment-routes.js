const router = require('express').Router();
const { Comment } = require('../../models');
const isAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll({
    order: [['created_at', 'DESC']]
  })
  .then(commentData => res.json(commentData))
  .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Comment.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(commentData => res.json(commentData))
  .catch(err => res.status(500).json(err));
});

router.post('/', isAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
    .then(commentData => res.json(commentData))
    .catch(err => res.status(500).json(err));
  }
});

router.put('/:id', isAuth, (req, res) => {
  Comment.update(
    {
      comment_text: req.body.comment_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(commentData => {
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this ID!' });
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => res.status(500).json(err));
});

router.delete('/:id', isAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(commentData => {
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => res.status(500).json(err));
});

module.exports = router;