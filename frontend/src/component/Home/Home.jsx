import React from 'react'
import PostCard from './PostCard'
import PostForm from './PostForm'
import Navbar from './Navbar'
import { useEffect ,useState } from 'react'
import '../../css/home.css'

import {NavLink, Navigate, useNavigate ,useParams,Link} from 'react-router-dom'
import Category from './Category'
import { useGetPost, useLikeInPost } from '../hooks/post'



const Home = () => {
  const {cat,posts,fetchPost,setFetchPost,getPostByCategory,setcat,getPost,like ,setLike} = useGetPost() 
  useEffect(()=>{
    if(cat){
      getPostByCategory(cat)
    }
    else{
      getPost()
    }
  },[fetchPost,cat ,like])

  return (
    <div>
       

        <div>
        
        <PostForm setFetchPost={setFetchPost}/>

        </div>
        <Category setcat={setcat}/>
        <Link to={'/trends'}>
        <div><button  className='text-white-700 text-sm font-semibold mb-1  bg-black-900 p-4 ml-4'>Trending</button> </div>
        </Link>
        <div className='post flex flex-wrap justify-center gap-5'>
          
        {
          posts.map((post)=>(

            <>
          
            <Link>
              <PostCard post={post} setLike={setLike} />
              </Link>
        
            
          </>


          ))
        }

        </div>
    </div>
  )
}

export default Home 
