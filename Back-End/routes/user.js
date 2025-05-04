const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const token = require('../middleware/token');
const User = mongoose.model('User');

router.get('/user/:id', token,(req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      Post.find({ PostedBy: req.params.id })
        .populate('PostedBy', '_id username')
        .then(posts => {
          res.json({ user, posts });
        })
        .catch(err => {
          return res.status(422).json({ error: err });
        });
    })
    .catch(err => {
      return res.status(500).json({ error: 'Internal server error' });
    });
});





router.put('/follow', token, async (req, res) => {
  try {
    // console.log("The follow id is: ", req.body.followID);

    // Update the user being followed
    const followedUser = await User.findByIdAndUpdate(
      req.body.followID,
      { $push: { followers: req.User._id } },
      { new: true }
    );

    // Update the current user's following list
    const currentUser = await User.findByIdAndUpdate(
      req.User._id,
      { $push: { following: req.body.followID } },
      { new: true }
    );

    res.json({ followedUser, currentUser });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




router.put('/unfollow', token, async (req, res) => {
  try {
    console.log("The unfollow id is: ", req.body.unfollowID);

    // Update the user being followed
    const unfollowedUser = await User.findByIdAndUpdate(
      req.body.unfollowID,
      { $pull: { followers: req.User._id } },
      { new: true }
    );

    // Update the current user's following list
    const currentUser = await User.findByIdAndUpdate(
      req.User._id,
      { $pull: { following: req.body.unfollowID } },
      { new: true }
    );

    res.json({ unfollowedUser, currentUser });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/search',(req,res)=>{
  let userPattern = new RegExp("^"+req.body.query)
  User.find({email:{$regex:userPattern}})
  .select("_id username")
  .then(user=>{
      res.json({user})
  }).catch(err=>{
      console.log(err)
  })

})




module.exports = router;
