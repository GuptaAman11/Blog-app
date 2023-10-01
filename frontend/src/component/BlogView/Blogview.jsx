import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Blogview = () => {
  const {postId} = useParams()
  const [post, setpost] = useState("")

  try {
    useEffect(()=>{
      const fetchData =async()=>{
        const authToken = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8000/api/v1/post/getPostByPostId/${postId}`, {
        method : 'GET', 
       
        headers : {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
        
      })
      if(response.ok){
        const responseData = await response.json()
        setpost(responseData)
        console.log(responseData)
      }
      }
      fetchData()
  
    },[])
  } catch (error) {
    console.log(error)
    
  }

  return (
    <div>
      <h1>this is the blogview</h1>
    </div>
  )
}

export default Blogview;
