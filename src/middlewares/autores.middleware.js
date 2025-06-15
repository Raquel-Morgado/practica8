const Autor = require('../models/autores.model');

const checkAutorId = async (req, res, next) => {
    const { autorId } = req.params;

    if (isNaN(autorId)) {
        return res.status(400).json({ message: 'El ID del autor debe ser un número' });
    }

    const autor = await Autor.getById(autorId);
    if (!autor) {
        return res.status(404).json({ message: 'El autor con ese ID no existe' });
    }

    req.autor = autor;

    next();
}

module.exports = { checkAutorId }