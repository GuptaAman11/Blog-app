import React from 'react'
import PostCard from './PostCard'
import PostForm from './PostForm'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div>
        <Navbar />
        <PostForm />
        <PostCard />
    </div>
  )
}

export default Home
