import React from 'react'
import '../../css/postcard.css'

const PostCard = ({post}) => {
  return (
    <div className="container-fluid">
    <div className="card" >.
    
         
        <img src="building1.webp" alt="building" className="building1" />
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
