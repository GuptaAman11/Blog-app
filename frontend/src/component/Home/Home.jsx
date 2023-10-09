import React from 'react'
import PostCard from './PostCard'
import PostForm from './PostForm'
import Navbar from './Navbar'
import { useEffect ,useState } from 'react'
import '../../css/home.css'
import {NavLink, Navigate, useNavigate ,useParams,Link} from 'react-router-dom'
import LikeHook from './LikeHook'
import Category from './Category'


const Home = () => {
  const Navigate = useNavigate()
  const[posts ,setposts] = useState([])
  const[fetchPost , setFetchPost] = useState(false)

  const url = posts.picture ? posts.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';


//getALL post posted by all user
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
      
      
    }
  }
  
  useEffect(()=>{
    getPost()
  },[fetchPost])

  return (
    <div>
        <Navbar />
        <PostForm setFetchPost={setFetchPost}/>
        <Category />
        <div className='post'>
        {
          posts.map((post)=>(

            <>
          
            <Link>
              <PostCard post={post}/>
              <Category />
              </Link>
        
            
          </>


          ))
        }

        </div>
        <div><LikeHook /></div>
    </div>
  )
}

export default Home 
