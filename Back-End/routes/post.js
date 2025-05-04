const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model("Post")
const token = require('../middleware/token')

router.post('/createpost', token, (req, res) => {
   
    const { caption, imageUrl } = req.body;
    if (!caption || !imageUrl) {
        return res.status(422).json({ error: "Please add all required fields" });
    }


    const post = new Post
        (
            {
                caption: caption,
                imageUrl: imageUrl,
                PostedBy: req.User
            }
        )

    post.save()
        .then(result => {
            res.json({ post: result })
        })
        .catch(err => {
            console.log(err)
        }
        )
})

router.get('/allposts', token, (req, res) => {
    Post.find().populate("PostedBy", "username")
    .populate("comments.PostedBy","_id username")
    .sort('-createdAt')
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        })
})


router.get('/followedposts', token, (req, res) => {
    Post.find({PostedBy:{$in:req.User.following}})
    .populate("PostedBy", "username")
    .populate("comments.PostedBy","_id username")
    .sort('-createdAt')
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        })
})


router.get('/myposts', token, (req, res) => {
    console.log('Request received');
    Post.find({ PostedBy: req.User._id })
        .populate('PostedBy', 'username')
        .then((mypost) => {
            console.log('Response sent:', mypost);
            res.json({ mypost });
        })
        .catch((err) => {
            console.log('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});


router.put('/like', token, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.User._id }
    }, {
        new: true
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(422).json({ error: err.message });
    });
});


router.put('/unlike', token, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.User._id }
    }, {
        new: true
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(422).json({ error: err.message });
    });
});

router.put('/comment', token, (req, res) => {

    const comment={
        text:req.body.text,
        PostedBy:req.User._id
    }

    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
    .populate("comments.PostedBy","_id username")
    .populate("PostedBy","_id username")
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(422).json({ error: err.message });
    });
});


router.put('/uncomment', token, (req, res) => {

    const comment={
        text:req.body.text,
        PostedBy:req.User._id
    }

    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { comments: comment }
    }, {
        new: true
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(422).json({ error: err.message });
    });
});


router.delete('/deletepost/:postId', token, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("PostedBy", "_id")
        .then(post => {
            if (!post) {
                return res.status(422).json({ error: "Post not found" });
            }

            if (post.PostedBy._id.equals(req.User._id)) {
                Post.deleteOne({ _id: post._id })
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "Internal server error" });
                    });
            } else {
                res.status(401).json({ error: "Unauthorized access" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        });
});



module.exports = router;