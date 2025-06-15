const { end } = require('../config/db');
const Autor = require('../models/autores.model');

const getAll = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;

    const autores = await Autor.selectAll(
        Number(page), Number(limit)
    );

    res.json({
        page,
        limit,
        results: autores
    });
}

const getById = async (req, res) => {
    const { autorId } = req.params;

    const autor = await Autor.getById(autorId);
    if (!autor){
        return res.status(404)
            .json({ message: 'El ID del autor no existe' });
    }        
    res.json(autor); 
}


const create = async (req, res) => {
    const result = await Autor.insert(req.body);
    const autor = await Autor.getById(result.insertId);
    res.json(autor);
}

const edit = async (req, res) => {
    const { autorId } = req.params;

    const result = await Autor.updateById(autorId, req.body);
    const autor = await Autor.getById(autorId);

    res.json(autor);
}

const remove = async (req, res) => {
    const { autorId } = req.params;
    const autor = await Autor.getById(autorId);
    await Autor.deleteById(autorId);
    res.json(autor);
}

module.exports = { getAll, getById, create, edit, remove }