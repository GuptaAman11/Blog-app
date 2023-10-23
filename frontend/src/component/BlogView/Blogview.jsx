import React, { useEffect, useState } from 'react';
import { useParams , Link} from 'react-router-dom';
import Commentform from './Commentform';
import '../../css/postcard.css'



const Blogview = () => {
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const url = post.picture ? `http://localhost:8000/${post.picture.replace(/^uploads\\/i, '')}` : 'https://tse3.mm.bing.net/th?id=OIP.IaUnm6JD3StW_ea8WMVjZgHaE3&pid=Api&P=0&h=180';

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
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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

      if (response.ok) {
        console.log('Post deleted successfully');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  

  return (



      <div>

        <div class="blog-post bg-blue-900 bg-opacity-25 shadow-md rounded-lg flex items-center space-x-10 my-10 p-10 relative ">
            <div class="w-96 h-72 relative">
                <img src={url} alt="Blog Post Image" class="w-full h-full object-cover rounded-lg" />
                <div class="absolute w-full h-full top-0 left-0 shadow-md bg-opacity-50 rounded-lg"></div>
            </div>
            <div class="flex-1">
                <div class="mb-5">
                    <span class="block text-gray-700 text-sm font-semibold mb-1">{post.title}</span>
                    <span class="block text-gray-700 text-sm font-semibold">Nov 12 2021</span>
                </div>
                <h1 class="text-2xl font-bold text-blue-500 mb-3 uppercase">{post.title}</h1>
                <p class="text-sm text-gray-600 mb-5">{post.desc}</p>
                <a href="#" class="block py-3 px-6 text-white uppercase text-sm rounded-lg bg-gradient-to-r from-pink-500 to-blue-500">Read More</a>
            </div>
            
            <div class="absolute bottom-4 right-4 ">
            <button onClick={handleDelete} className='bg-blue-500 text-white px-11 py-2 rounded-lg'>delete</button>

              <Link to={`/update/${post._id}`}>
              <button class="bg-blue-500 text-white px-11 py-2 rounded-lg" >update</button>

              </Link>
                <button class="bg-blue-500 text-white px-5 py-2 rounded-lg">Likfdfde</button>
                <button class="bg-gray-700 text-white px-5 py-2 rounded-lg">Comment</button>
            </div>
        </div>

        <div className="w-1/2"><Commentform post={post} /></div> 

        </div>

    
        
   



   
   
  );
}

export default Blogview;