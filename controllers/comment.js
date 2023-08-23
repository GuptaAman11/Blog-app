
const post = require('./models/post.js')
const comment = require('./models/cpmment.js')

app.post('/blogs/:blogId/comments', async (req, res) => {
    try {
      const { comment, user } = req.body;
      const postId = req.params.postId;
  
      if (!mongoose.isValidObjectId(postId)) {
        return res.status(400).json({ message: 'Invalid blog ID' });
      }
  
      const post = await post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      const newComment = new Comment({
        text: comment,
        user: user,
      });
  
      await newComment.save();
  
      blog.comments.push(newComment);
      await blog.save();
  
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });