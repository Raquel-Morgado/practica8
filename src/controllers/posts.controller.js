const Post = require('../models/posts.model');

const Autor = require('../models/autores.model');

const getAll = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;

    const posts = await Post.selectAll(
        Number(page), Number(limit)
    );

    posts.forEach(post => {
        const autor = Autor.getById(post.autores_id);
        post.autor= autor;
    });

    res.json({
        page,
        limit,
        results: posts
    });
}

const getById = async (req, res) => {
    const { postId } = req.params;

    const post = await Post.selectById(postId);
    if (!post){
        return res.status(404)
            .json({ message: 'El ID del post no existe' });
    }
    const autor = await Autor.getById(post.autores_id);
    console.log(autor);
    post.autor= autor;
    res.json(post); 
}


const create = async (req, res) => {
    // req.body
    const result = await Post.insert(req.body);
    const post = await Post.selectById(result.insertId);
    res.json(post);
}

const edit = async (req, res) => {
    const { postId } = req.params;

    const result = await Post.updateById(postId, req.body);
    const post = await Post.selectById(postId);

    res.json(post);
}

const remove = async (req, res) => {
    const { postId } = req.params;
    const post = await Post.selectById(postId);
    await Post.deleteById(postId);
    res.json(post);
}

const getPostsByAutor = async (req, res) => {
    const { autorId } = req.params;
    const autor = await Autor.getById(autorId);
    if (!autor){
        return res.status(404)
            .json({ message: 'El ID del autor no existe' });
    }
    const posts = await Post.getPostsByAutor(autorId);
    if (!posts){
        return res.status(404)
            .json({ message: 'No existes posts para el autor indicado' });
    }
    res.json({autor: autor, posts: posts}); 
}

module.exports = { getAll, getById, create, edit, remove, getPostsByAutor }