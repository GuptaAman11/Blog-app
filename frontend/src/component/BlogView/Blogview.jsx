import React, { useEffect, useState } from 'react';
import { useParams , Link} from 'react-router-dom';
import Commentform from './Commentform';
import '../../css/postcard.css'
import { toast } from 'react-toastify';




const Blogview = () => {
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const [fetchComment, setfetchComment] = useState(false);

  const url = post.picture ? `http://localhost:8000/${post.picture.replace(/^uploads[\/\\]/, '')}` : 'https://tse3.mm.bing.net/th?id=OIP.IaUnm6JD3StW_ea8WMVjZgHaE3&pid=Api&P=0&h=180';

// getpost by postid
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/v1/post/getPostByPostId/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (response.ok) {
          const responseData = await response.json();
          setPost(responseData);
          console.log(responseData)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [fetchComment]);

  const handleDelete = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/v1/post/deletePost/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.status===200) {
        toast.success('Post deleted successfully');
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      toast.error("you are not a owner of the post");
    }
  };


  

  return (



      <div>

        <div className="blog-post bg-blue-900 bg-opacity-25 shadow-md rounded-lg flex items-center space-x-10 my-10 p-10 relative ">
            <div className="w-96 h-72 relative">
                <img src={url} alt="Blog Post Image" className="w-full h-full object-cover rounded-lg" />
                <div className="absolute w-full h-full top-0 left-0 shadow-md bg-opacity-50 rounded-lg"></div>
            </div>
            <div className="flex-1">
                <div className="mb-5">
                    <span className="block text-gray-700 text-sm font-semibold mb-1">{post.title}</span>
                    <span className="block text-gray-700 text-sm font-semibold">{post.createdAt}</span>
                </div>
                <h1 className="text-2xl font-bold text-blue-500 mb-3 uppercase">{post.title}</h1>
                <p className="text-sm text-gray-600 mb-5">{post.desc}</p>
            </div>
            
            <div className="absolute bottom-4 right-4  ">
            <button onClick={handleDelete} className='bg-blue-500 text-white px-11 py-2 rounded-lg mr-1'>delete</button>

              <Link to={`/update/${post._id}`}>
              <button className="bg-blue-500 text-white px-11 py-2 rounded-lg mr-1" >update</button>

              </Link>
                <button className="bg-blue-500 text-white px-5 py-2 rounded-lg mr-1">Like</button>
                <button className="bg-gray-700 text-white px-5 py-2 rounded-lg mr-1">Comment</button>
            </div>
        </div>

        <div className="w-1/2"><Commentform post={post} setfetchComment={setfetchComment}/></div> 

        </div>

    
        
   



   
   
  );
}

export default Blogview;