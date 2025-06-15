const router = require('express').Router();

const { getAll, getById, create, edit, remove } = require('../../controllers/autores.controller');
const { checkAutorId } = require('../../middlewares/autores.middleware');

router.get('/', getAll);
router.get('/:autorId', checkAutorId, getById);

router.post('/', create);
router.put('/:autorId', checkAutorId, edit);
router.delete('/:autorId', checkAutorId, remove);

module.exports = router;