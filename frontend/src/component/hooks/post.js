import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



export function useFindTrendingPost() {
  const [trend, setTrend] = useState([]);
  const trendFind = async () => {
    const authToken = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/v1/post/api/cluster-assignments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      setTrend(responseData);
      console.log(responseData);
    }
  };
  return { trend, trendFind };

}
export function useAiToGetDescription() {
  const [aiDesc , setAiDesc] = useState()
  const aiDescription = async (postFormData) => {
    console.log(postFormData , " this is postform")
    try {
      const authToken = localStorage.getItem('token');

      

      const response = await fetch(
        'http://localhost:8000/api/v1/ai/gemini',{
          method : "POST",
          headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body : JSON.stringify({
            suggestion : postFormData
          }),
        }
      );

      if(response.ok){
        const responseData = await response.json()
        setAiDesc(responseData?.textResponse)
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the post');
    }
  };

  return { aiDescription , aiDesc };
}

export function useAddPost() {
  const addPost = async (postFormData, postDescription , file, setFile, setFetchPost) => {
    try {
      const authToken = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('title', postFormData.postTitle);
      formData.append('desc', postDescription);
      formData.append('categories', postFormData.postCategory);
      formData.append('picture', file);

      const response = await axios.post(
        'http://localhost:8000/api/v1/post/createPost',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.message);
        setFile(null);
        return true ;
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the post');
    }
  };

  return { addPost };
}


export function useGetPost() {

  const[posts ,setposts] = useState([])
  const[queryWalaPost ,setQueryWalaposts] = useState([])

  const [cat ,setcat] = useState('')
 

//getALL post posted by all user
  const getPost = async(loadMore , searchQuery)=>{
    
    
      try {
        const authToken = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8000/api/v1/post/get5post?page=${loadMore}&search=${searchQuery}`,{
          method : 'GET' , 
            headers :{
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${authToken}`
            }
        })
        const responseData = await response.json()

        
        
        if(response.ok){
          if(searchQuery !== ""){
            setQueryWalaposts((prevPost) => [...prevPost, ...responseData.posts]);
          }else{
            setposts((prevPosts) => [...prevPosts , ...responseData.posts]);
          }
          
        }
      } catch (error) {
        toast.error("errror while fetching the post please try again later")
        console.log(error)
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
      setposts(responseData.post)
      toast.success(responseData.message)

      
      
      
    }
  }
  return {setposts ,posts,cat,getPostByCategory,getPost,setcat ,queryWalaPost ,setQueryWalaposts }
  
}






export function useUpdatePost(postFormData){

  const[post ,setPost] = useState("")
  const {postId} = useParams();
  const navigate = useNavigate()



    const fetchData = async () => {

      try {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/v1/post/getPostByPostId/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (response.ok) {
          const responseData = await response.json();
          setPost(responseData);
          
        }
      } catch (error) {
        console.log(error);
      }
    }


 
  const updateContent = async(postFormData)=>{

    try {
        const authToken = localStorage.getItem('token')
        const response =await fetch(`http://localhost:8000/api/v1/post/updatePost/${post._id}`,{
            method : 'PUT' ,
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
    
            },
            body: JSON.stringify({
                title: postFormData.postTitle,
                desc: postFormData.postDesc,
                categories : post.categories
              }),
    
        })
    
        if(response.ok){
            const responseData = await response.json()
            setPost(responseData) ;
            navigate('/home')
    
        }
       
    } catch (error) {
        console.log(error)
        
    }
  }
  
return {
  updateContent , post , fetchData
}

}



export function useLikeInPost () {
  

  const likePost = async (postId) => {
    try {
      const authToken = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8000/api/v1/like/likeInPost/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();

      }
    } catch (error) {
      console.log(error);
    }
  
  }
  return {likePost }
}

export function useGetPostByUserId() {
  const [userPost , setUserPost] = useState([]) ;
  const getPostByUserId = async(userId) => {
    const authToken = localStorage.getItem('token')
    try{
      const response = await fetch(`http://localhost:8000/api/v1/post/getPostById/${userId}`,{
        method : 'GET' ,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
      const responseData = await response.json() ;
      if(response.status === 200){
        setUserPost(responseData) ;      
        toast.success(responseData.message)
        
      }
    }catch(error){
      toast.error("error while getting a post ")
      console.log(error)
    }
  }
  return {
    userPost , getPostByUserId
  }
}



export function useDeletePost() {

  const deletePost = async (postId) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/v1/post/deletePost/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        toast.success('Post deleted successfully');
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      toast.error("You are not the owner of the post");
    }
  };

  return { deletePost };
};

