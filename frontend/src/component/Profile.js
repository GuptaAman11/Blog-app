import React, { useState, useEffect } from 'react';
import PostCard from './Home/PostCard';
import { useParams } from 'react-router-dom';
import { useGetPostByUserId } from './hooks/post';
import Spinner from './Spinner/Spinner';
import { useGetUserInfo } from './hooks/user';
import { useSupplier } from '../context/postRefresh';
import { useFollow, useGetFollow } from './hooks/follow';
import { useInfoSupplier } from '../context/AuthContext';
const Profile = () => {
  const {userinfo , loading} = useInfoSupplier()
  console.log(userinfo, "this is the first render after init")

  const params = useParams()
  const {userId} = params ;

  const {userDetails , getUserInfo} = useGetUserInfo()
  const [fieldInPostCard , setFieldInPostCard] = useState(false)
  useEffect(() => {
    if (!loading) {
      setFieldInPostCard(userinfo?._id === userId);
    }
  }, [loading, userinfo, userId]);
  console.log(userinfo?._id , userId)

  const {triggerUpdate , shouldUpdate} = useSupplier()
  const {follow } = useFollow()
  const {getFollow , isFollow , followDetails} = useGetFollow()

  

  useEffect(() => {
    getUserInfo(userId);
  }, [userId, shouldUpdate]);

  const { getPostByUserId, userPost } = useGetPostByUserId();
  useEffect(() => {
    getPostByUserId(userId);
  }, [userId , shouldUpdate]);

  const handleOnFollow = async () => {
    await follow(userId);
    triggerUpdate();
  };

  useEffect(()=>{
    getFollow(userId) ;
  },[userId , shouldUpdate])
  

  return (
    <div className="profile-container max-w-6xl mx-auto mt-28">
      {/* Profile Banner */}
      

      <div className="profile-content mt-[-5rem] flex items-center justify-between">
        {/* Profile Picture and Info */}
        <div className="flex items-center">
          <div className="profile-image rounded-full overflow-hidden w-32 h-32 border-4 border-white shadow-lg">
            <img
              src="	https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="profile-info ml-4">
            <h2 className="text-2xl font-bold">{userDetails?.name}</h2>
            <p className="text-gray-600">{userDetails?.email}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button onClick={() => handleOnFollow()} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          {isFollow ? "unfollow" : "follow"}
        </button>
      </div>

      {/* Profile Stats */}
      <div className="profile-stats flex justify-around mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="text-center">
          <p className="text-xl font-bold">{userPost?.qty}</p>
          <p className="text-gray-600">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{followDetails?.followerId?.length}</p>
          <p className="text-gray-600">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{followDetails?.followingId?.length}</p>
          <p className="text-gray-600">Following</p>
        </div>
      </div>

      {/* My Posts Section */}
      <div className="posts-section mt-8">
        <h3 className="text-xl font-semibold mb-4">My Posts</h3>
        <div className="posts-grid grid grid-cols-1 md:grid-cols-1 gap-6">
          {userPost.qty === 0 ? (<div>You didnt posted anything</div>) :
           userPost.posts ? userPost.posts.map((post) => (
            <PostCard key={post._id} post={post} fieldInPostCard = {fieldInPostCard} />
          )) : (<div><Spinner /></div>)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
