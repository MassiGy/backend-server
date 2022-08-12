
/**
 * @module List One User Post Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller allows to read a specific post written by a given user, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */




module.exports.listOneUserPost = async (req, res) => {


    // fetch the requested post.

    const foundPost = await Post.findOne({
        where: {
            id: req.params.postId,
            ownerId: req.params.id,
        },
        attributes: ['title', 'content', 'ownerId'],
    })

    if (!foundPost) {
        return res.status(404).send('Post ressource not found.');
    }

    // send back to the user the fetched data.

    return res.status(200).json(foundPost);
}

