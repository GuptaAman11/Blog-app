const express = require('express');
const router = express.Router();
const Followers = require('../models/followers');
const { verifyJWT } = require('../middleware/verify');

router.post('/follow/:followingId', verifyJWT, async (req, res) => {
    const followerId = req.user.user._id;
    const { followingId } = req.params;
    console.log(followerId , followingId , "follower id and following id")


    if (followerId === followingId) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }
    if (!followerId) {
        return res.status(403).json({ message: "You are not an authorized user" });
    }

    try {
        let followerDocument = await Followers.findOne({ userId: followerId });

        // Initialize followerId as an array if it doesn't exist
        if (!followerDocument) {
            followerDocument = await Followers.create({
                userId: followerId,
                followerId: [] // Initialize followerId as an empty array
            });
        }

        // Check if followerId is initialized and manage follow/unfollow logic
        followerDocument.followerId = followerDocument.followerId || [];
        if (followerDocument.followerId.includes(followingId)) {
            followerDocument.followerId.pull(followingId); // Unfollow
        } else {
            followerDocument.followerId.push(followingId); // Follow
        }

        await followerDocument.save();

        // Find or create the user being followed
        let followingDocument = await Followers.findOne({ userId: followingId });
        if (!followingDocument) {
            followingDocument = await Followers.create({
                userId: followingId,
                followingId: [] // Initialize followerId array for the following user
            });
        }

        // Manage following relationship
        followingDocument.followingId = followingDocument.followingId || [];
        if (followingDocument.followingId.includes(followerId)) {
            followingDocument.followingId.pull(followerId); // Unfollow
        } else {
            followingDocument.followingId.push(followerId); // Follow
        }
        await followingDocument.save();

        return res.status(200).json({ message: "Follow status updated successfully", followerDocument ,followingDocument });

    } catch (error) {
        console.error("Error in follow route:", error); // More detailed logging
        return res.status(500).json({ message: error.message });
    }
});

router.get('/isfollow/:userId', verifyJWT, async (req, res) => {
    const { userId } = req.params;
    const loggedUserId = req.user.user._id;

    const isFollow = await Followers.findOne({ userId: loggedUserId, followerId: userId });
    const followDetails = await Followers.findOne({userId : userId})
    return res.status(200).json({ isFollow : !!isFollow , followDetails : followDetails});
});
module.exports = router;
