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
  const [cat ,setcat] = useState('')

  const url = posts.picture ? posts.picture : 'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SXOdGzBlhhkAQWS9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzc3MmJiZjU3YjJkZmRiNGViODQ2NGMzOTI2YjgxOWYwBGdwb3MDMTcEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dvector%2Banimated%2Bimages%26type%3DE211IN885G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D17&w=1920&h=1080&imgurl=vectorified.com%2Fimage%2F2d-vector-animation-10.png&rurl=https%3A%2F%2Fvectorified.com%2F2d-vector-animation&size=97.5KB&p=vector+animated+images&oid=772bbf57b2dfdb4eb8464c3926b819f0&fr2=piv-web&fr=mcafee&tt=2d+Vector+Animation+at+Vectorified.com+%7C+Collection+of+2d+Vector+...&b=0&ni=21&no=17&ts=&tab=organic&sigr=qjVAIJQDCVq.&sigb=ZnmC6cIQZJ_K&sigi=JfEAOPu_50gp&sigt=sXFkLVdVLHUT&.crumb=n7msA.koM5V&fr=mcafee&fr2=piv-web&type=E211IN885G0';


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
      console.log("thi is the post",posts)
      // console.log(responseData)
      
      
    }
  }

  const getPostByCategory = async(cat)=>{
    const authToken = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8000/api/v1/post/getPostByCategory?category=${cat}`,{
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
    if(cat){
      getPostByCategory(cat)
    }
    else{
      getPost()
    }
  },[fetchPost,cat])

  return (
    <div>
       

        <div>
        
        <PostForm setFetchPost={setFetchPost}/>

        </div>
        <Category setcat={setcat}/>
        <div className='post flex flex-wrap justify-center gap-5'>
        {
          posts.map((post)=>(

            <>
          
            <Link>
              <PostCard post={post}/>
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
