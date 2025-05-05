const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    },
    followerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    followingId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Followers', followerSchema);