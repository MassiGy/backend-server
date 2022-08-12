
/**
 * @module Create Post Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to create his own post, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */




module.exports.createPost = async (req, res) => {

    // check if all the parameters are valid.

    const { postTitle, postContent } = req.body;

    if (!postTitle || !postContent) {
        return res.status(400).send('post content or post title cannot be blank.');
    }


    // get the current user ;

    const user = User.findOne({
        where: {
            id: req.user.id,
        }
    })


    // create a new post record

    const newPost = await Post.create({
        title: postTitle,
        content: postContent,
        ownerId: req.user.id,
    })


    // set the association.
    
    user.addPost(newPost);



    // inform the user with the process status.

    return res.status(200).send('post created');
}

