
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const Post = require('./models/post')

const clearLikesFromAllPosts = async () => {
    try {
        // Update all posts to reset the 'likes' field to an empty array
        const result = await Post.updateMany({}, { $set: { likes: [] } });

        console.log(`Successfully cleared likes for ${result.modifiedCount} posts`);
    } catch (error) {
        console.error('Error clearing likes from all posts:', error);
    }
};

// Call the function to run the operation


const url = `mongodb+srv://${username}:${password}@cluster0.vyehgry.mongodb.net/test?retryWrites=true&w=majority`
// const url = 'mongodb://127.0.0.1/practice'
const Connection = () => {
    mongoose.connect(url).then(() => {
        console.log("concttioned!!!")
    })
}
 
module.exports = {
    Connection
}