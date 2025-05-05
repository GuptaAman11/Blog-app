import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDeletePost, useLikeInPost } from '../hooks/post';
import { useSupplier } from '../../context/postRefresh';

const PostCard = ({ post, fieldInPostCard, queryWalaPost }) => {
  const { deletePost } = useDeletePost();
  const { likePost } = useLikeInPost();
  const { triggerUpdate } = useSupplier();

  // Local state for like status and like count
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes?.length || 0);

  // Initialize like status based on post's initial data
  useEffect(() => {
    // Assuming `post.isLiked` is passed from the backend if the current user liked the post
    setIsLiked(post?.isLiked || false);
  }, [post]);

  const handleLike = async () => {
    await likePost(post?._id).then(() => {
      triggerUpdate(); // Notify parent component to update if necessary

      // Toggle the `isLiked` status and adjust `likeCount`
      setIsLiked((prev) => !prev);
      setLikeCount((prevCount) => isLiked ? prevCount - 1 : prevCount + 1);
    });
  };

  const handleDelete = async () => {
    await deletePost(post?._id);
    triggerUpdate(); // Notify parent component
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="blog-post bg-blue-900 bg-opacity-25 shadow-md rounded-lg 
        flex flex-col md:flex-row items-center md:space-x-10 space-y-6 md:space-y-0 
        my-10 p-4 md:p-10 relative">
        
        {/* Image Section */}
        <div className="w-full md:w-96 h-48 md:h-72 relative">
          <Link to={`/blogview/${post._id}`}>
          <img src={post?.picture?(post.picture): ("https://tse3.mm.bing.net/th?id=OIP.IaUnm6JD3StW_ea8WMVjZgHaE3&pid=Api&P=0&h=180")} alt="Blog Post Image" className="w-full h-full object-cover rounded-lg" />
          </Link>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 w-full">
          <div className="mb-5">
            <Link to={`/profile/${post?.author?._id}`}>
              <span className="block text-gray-700 text-sm font-semibold mb-1">
                {post?.author?.name || 'Unknown Writer'}
              </span>
              <span className="block text-gray-700 text-sm font-semibold">{post.createdAt}</span>
            </Link>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-blue-500 mb-3 uppercase">{post.title}</h1>
          <p className="text-sm text-gray-600 mb-5">{post.desc || 'Post Description'}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full md:w-auto md:absolute md:bottom-4 md:right-4">
          {fieldInPostCard && (
            <button onClick={handleDelete} className="bg-blue-500 text-white px-11 py-2 rounded-lg mr-1">
              Delete
            </button>
          )}
          <button 
            className={`flex-1 md:flex-none px-5 py-2 rounded-lg  bg-blue-500'`}
            onClick={handleLike}
          >
            { 'Like'} {likeCount}
          </button>
          <Link to={`/blogview/${post._id}`} className="flex-1 md:flex-none">
            <button className="w-full bg-gray-700 text-white px-5 py-2 rounded-lg">Comment</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;



