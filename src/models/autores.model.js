const db = require('../config/db');

const getById = async (usuarioId) => {
    const [result] = await db.query('select * from autores where id = ?', [usuarioId]);
    if (result.length === 0) return null;
    return result[0];
}

const getByEmail = async (email) => {
    const [result] = await db.query('select * from autores where email = ?', [email]);
    if (result.length === 0) return null;
    return result[0];
}

const insert = async ({ nombre, email, imagen }) => {
    const [result] = await db.query('insert into autores (nombre, email, imagen) values (?, ?, ?)', [nombre, email, imagen]);
    return result;
}

const selectAll = async (page, limit) => {
    const [result] = await db.query(`
        select * from autores
        limit ?
        offset ?
    `, [limit, (page - 1) * limit]);
    return result;
}


const updateById = async (autorId, { nombre, email, imagen}) => {
    const [result] = await db.query(
        'update autores set nombre = ?, email = ?, imagen = ? where id = ?',
        [nombre, email, imagen, autorId]
    );
    return result;
}

const deleteById = async (autorId) => {
    const [result] = await db.query('delete from autores where id = ?', [autorId]);
    return result;
}

module.exports = { insert, getById, getByEmail, selectAll, updateById, deleteById};