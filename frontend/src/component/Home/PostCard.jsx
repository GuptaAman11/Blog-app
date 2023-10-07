import React from 'react'
import '../../css/postcard.css'

const PostCard = ({post}) => {

  const url = post.picture ? post.picture : 'https://tse3.mm.bing.net/th?id=OIP.IaUnm6JD3StW_ea8WMVjZgHaE3&pid=Api&P=0&h=180';

  return (
    <div className="container-fluid">
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
  )
}

export default PostCard ;
