const router = require('express').Router();
const apiRoutes = require('./api-routes');
// const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
// router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;