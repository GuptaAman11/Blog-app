
const post = require('./models/post.js')
const comment = require('./models/comment.js')

const comments =  async (req, res) => {
    try {
      const { text } = req.body;
      const postId = req.params.postId;
  
      if (!mongoose.isValidObjectId(postId)) {
        return res.status(400).json({ message: 'Invalid blog ID' });
      }
  
      const post = await post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      const newComment = new Comment({
        text: comment
      });
  
      await newComment.save();
  
      blog.comments.push(newComment);
      await blog.save();
  
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  module.exports ={
    comments
  }