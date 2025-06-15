const router = require('express').Router();

router.use('/posts', require('./api/posts.routes'));
router.use('/autores', require('./api/autores.routes'));

module.exports = router;