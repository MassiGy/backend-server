
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

    // find the original post.

    const foundPost = await Post.findOne({
        where: {
            id: req.params.postId,
        }
    });

    // check that it exists.

    if (!foundPost) {
        return res.status(404).send({ msg: 'The post that you are trying to update does not exist.' });
    }

    console.group()
    console.log(foundPost);
    console.log("//");
    console.log(foundPost.likedBy instanceof Array);
    console.groupEnd();
   
    // push the user id to the post likers array.

    // foundPost.likedBy.push(req.user.id)

    // foundPost.likedBy.push(1);


    // inform the user with the process status.

    return res.status(200).send('post liked!');
}

