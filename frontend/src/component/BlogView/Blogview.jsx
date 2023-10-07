import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Commentform from './Commentform';
import '../../css/postcard.css'



const Blogview = () => {
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const url = post.picture ? post.picture : 'https://tse3.mm.bing.net/th?id=OIP.IaUnm6JD3StW_ea8WMVjZgHaE3&pid=Api&P=0&h=180';


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


  

  return (

    <div className="container-fluid">
       <Commentform post={post} />

    <div className="card" >
    
         
        <img src={url} alt="building" className="building1" />
        <h1 className="heading">{post.title}</h1>
        <div className="text">
            
            <p className="para" >{post.desc}</p> 
           
        </div>
        <div class="foot">
             <button className="btn">LIKE</button>
             <button className="btn">SHARE</button>
        </div>

    </div>



</div>
   
   
  );
}

export default Blogview;
