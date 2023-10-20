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
  const url = post.picture? `http://localhost:8000/${post.picture.replace(/^uploads\\/i, '')}`: 'https://tse3.mm.bing.net/th?id=OIP.IaUnm6JD3StW_ea8WMVjZgHaE3&pid=Api&P=0&h=180';
  console.log(post.picture)

  return (
<div className="mt-16">
  <div className="bg-gradient-to-r from-blue-500 to-blue-200 rounded-lg m-4 p-6 h-96 w-96 style">
    <Link to={`/blogview/${post._id}`} className="text-decoration-none text-blue-500 hover:text-teal-500 block">
      <img src={url} alt="building" className="w-full h-32 rounded-lg" />
    </Link>
    <h1 className="text-2xl font-light mt-4 text-center"> {/* Centered the text */}
      {post.title}
    </h1>
    <div className="text">
      <p className="text-center"> {/* Centered the text */}
        {post.desc}
      </p>
    </div>
    <div className="foot flex justify-between bg-purple-300 p-4 rounded-b-lg">
      <button className="btn text-black" onClick={() => likePost(post?._id)}>
        LIKE {post?.likes?.length}
      </button>
      <Link to={`/blogview/${post._id}`}>
        <button className="btn text-black">COMMENT</button> {/* Changed the button color to black */}
      </Link>
    </div>
  </div>
</div>



  )
}

export default PostCard ;
