const Post = require('../models/posts.model');

const checkPostId = async (req, res, next) => {
    const { postId } = req.params;

    if (isNaN(postId)) {
        return res.status(400).json({ message: 'El ID del post debe ser un número' });
    }

    const post = await Post.selectById(postId);
    if (!post) {
        return res.status(404).json({ message: 'El post con ese ID no existe' });
    }

    req.post = post;

    next();
}

module.exports = { checkPostId }