import React from 'react'
import PostCard from './PostCard'
import PostForm from './PostForm'
import Navbar from './Navbar'
import { useEffect ,useState } from 'react'
import '../../css/home.css'
import {NavLink} from 'react-router-dom'


const Home = () => {
  const[posts ,setposts] = useState([])


  const getPost = async()=>{
    const authToken = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8000/api/v1/post/getPost`,{
      method : 'GET' , 
        headers :{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
    })
    const responseData = await response.json()
    if(response.ok){
      setposts(responseData)
      // console.log(responseData)
      console.log("post from set posts", posts)
      
    }
  }
  
  useEffect(()=>{
    getPost()
  },[])
  return (
    <div>
        <Navbar />
        <PostForm />
        <div className='post'>
        {
          posts.map((post)=>(

            <PostCard post={post}/>


          ))
        }
        </div>
    </div>
  )
}

export default Home
