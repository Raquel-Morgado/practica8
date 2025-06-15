const router = require('express').Router();

const { getAll, getById, create, edit, remove, getPostsByAutor } = require('../../controllers/posts.controller');
const { checkPostId } = require('../../middlewares/posts.middleware');

router.get('/', getAll);

router.get('/autor/:autorId', getPostsByAutor);
router.get('/:postId', checkPostId, getById);

router.post('/', create);
router.put('/:postId', checkPostId, edit);
router.delete('/:postId', checkPostId, remove);

module.exports = router;
