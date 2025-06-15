const db = require('../config/db');

const selectAll = async (page, limit) => {
    const [result] = await db.query(`
        select * from posts
        limit ?
        offset ?
    `, [limit, (page - 1) * limit]);
    return result;
}

const selectById = async (postId) => {
    const [result] = await db.query('select * from posts where id = ?', [postId]);
    if (result.length === 0) return null;
    return result[0];
}

const insert = async ({ titulo, descripcion, categoria, autores_id }) => {
    const [result] = await db.query(`
        insert into posts (titulo, descripcion, categoria, autores_id ) values (?, ?, ?, ?)    
    `, [titulo, descripcion, categoria, autores_id]);
    return result;
}

const updateById = async (postId, { titulo, descripcion, categoria }) => {
    const [result] = await db.query(
        'update posts set titulo = ?, descripcion = ?, categoria = ? where id = ?',
        [titulo, descripcion, categoria, postId]
    );
    return result;
}

const deleteById = async (postId) => {
    const [result] = await db.query('delete from posts where id = ?', [postId]);
    return result;
}

const getPostsByAutor = async (autorId) => {
    const [result] = await db.query('select * from posts where autores_id = ?', [autorId]);
    if (result.length === 0) return null;
    return result;
}

module.exports = {
    selectAll, selectById, insert, updateById, deleteById, getPostsByAutor
}
