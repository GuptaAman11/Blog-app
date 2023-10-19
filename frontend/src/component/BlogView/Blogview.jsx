import React, { useEffect, useState } from 'react';
import { useParams , Link} from 'react-router-dom';
import Commentform from './Commentform';
import '../../css/postcard.css'



const Blogview = () => {
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const url = post.picture ? post.picture : 'https://tse3.mm.bing.net/th?id=OIP.IaUnm6JD3StW_ea8WMVjZgHaE3&pid=Api&P=0&h=180';

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

    <div className="flex border-2">
       

    <div className="card w-1/2 mx-auto mt-16" >


    
         
        <img src={url} alt="building" className="building1" />
        <h1 className="heading">{post.title}</h1>
        <div className="text">
            
            <p className="para" >{post.desc}</p> 
           
        </div>
        <div class="foot">
             <button className="btn">LIKE</button>
             <button className="btn">SHARE</button>
        </div>
        <Link to={`/update/${postId}`}>
      <button>update</button>

    </Link>
    <button onClick={handleDelete}>delete</button>
    </div>
   
  <div className="w-1/2"><Commentform post={post} /></div>


</div>

   
   
  );
}

export default Blogview;