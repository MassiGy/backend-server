
/**
 * @module Like Post Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to like a post, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */





module.exports.likePost = async (req, res) => {

    if (!req.params.postId) {
        return res.status(400).send('invalid post id.');
    }

    // find the post to like and the current user.

    const [postToLike, currentUser] = await Promise.all([

        Post.findOne({
            where: {
                id: req.params.postId,
            }
        }),
        User.findOne({
            where: {
                id: req.user.id,
            }
        })
    ])

    // check that it exists.

    if (!postToLike) {
        return res.status(404).send({ msg: 'The post that you are trying to update does not exist.' });
    }

    // set the association
    currentUser.addLikedPost(postToLike);


    // inform the user with the process status.

    return res.status(200).send('post liked!');
}

