import React from 'react'
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
<div className="mt-16">
  <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg m-4 p-6 w-72 h-96"> {/* Set fixed width and height */}
    <Link to={`/blogview/${post._id}`} className="text-decoration-none text-blue-500 hover:text-teal-500 block">
      <img src={url} alt="building" className="w-full h-32 rounded-lg" /> {/* Adjusted image size and border radius */}
    </Link>
    <h1 className="text-2xl font-light mt-4 justify-center"> {/* Increased font size and top margin */}
      {post.title}
    </h1>
    <div className="text">
      <p className="justify-center">{post.desc}</p>
    </div>
    <div className="foot flex justify-between bg-green-300 p-4 rounded-b-lg">
      <button className="btn" onClick={() => likePost(post?._id)}>
        LIKE {post?.likes?.length}
      </button>
      <button className="btn">SHARE</button>
    </div>
  </div>
</div>



  )
}

export default PostCard ;
