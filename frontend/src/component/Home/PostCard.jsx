import React from 'react'
import '../../css/postcard.css'
import {Link} from 'react-router-dom'

const PostCard = ({post}) => {

  const likePost =async(postId) => {
    try {
      const authToken = localStorage.getItem('token')

      const response = await fetch(`http://localhost:8000/api/v1/like/likeInPost/${postId}` , {
          method : 'POST' ,
          headers : {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${authToken}`
          }
      })

      if(response.ok){
          const responseData = await response.json()
          console.log(responseData)
      }

    } catch (error) {

         console.log(error)
     
    }
 }
  const url = post.picture ? post.picture : 'https://tse3.mm.bing.net/th?id=OIP.IaUnm6JD3StW_ea8WMVjZgHaE3&pid=Api&P=0&h=180';

  return (
    <div className="container-fluid">
    <div className="card" >
    
    <Link to={`/blogview/${post._id}`} className='link'>
        <img src={url} alt="building" className="building1"  />
        </Link>
        <h1 className="heading">{post.title}</h1>
        <div className="text">
            
            <p className="para" >{post.desc}</p> 

    
           
        </div>
        <div class="foot">
             <button className="btn" onClick={()=>{
              likePost(post?._id)
             }}>LIKE {post?.likes?.length} </button>
             <button className="btn">SHARE</button>
        </div>

        
       


    </div>

</div>
  )
}

export default PostCard ;
