import React from 'react'
import PostCard from './PostCard'
import PostForm from './PostForm'
import Navbar from './Navbar'
import { useEffect ,useState } from 'react'
import '../../css/home.css'
import {NavLink, Navigate, useNavigate ,useParams,Link} from 'react-router-dom'
import LikeHook from './LikeHook'


const Home = () => {
  const Navigate = useNavigate()
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

            <Link to={`/blogview/${post._id}`} className='link'>
            
              <PostCard post={post}/>
            </Link>
          


          ))
        }

        </div>
        <div><LikeHook /></div>
    </div>
  )
}

export default Home
