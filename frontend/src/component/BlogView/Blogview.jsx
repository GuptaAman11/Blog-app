import React, { useEffect, useState } from 'react';
import { useParams , Link, useNavigate, useSubmit} from 'react-router-dom';
import Commentform from './Commentform';
import { toast } from 'react-toastify';
import { useLikeInPost } from '../hooks/post';
import PostCard from '../Home/PostCard';
import { useSupplier } from '../../context/postRefresh';




const Blogview = () => {
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const [fetchComment, setfetchComment] = useState(false);
  const {shouldUpdate} = useSupplier()
  const navigate = useNavigate();

  const {likePost}= useLikeInPost()

  const likedPost =async() => {

    likePost(post?._id)

  }



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
          if(response.ok){
            setPost(responseData);
            toast.success("post fetched sucessfully")
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [fetchComment , shouldUpdate]);

  


  

  return (



      <div>

        <PostCard post = {post} />

        <div className="w-1/2"><Commentform post={post} setfetchComment={setfetchComment}/></div> 

        </div>

    
        
   



   
   
  );
}

export default Blogview;