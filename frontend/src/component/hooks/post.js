import { useState , useEffect} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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


export function useAddPost() {
  const addPost = async (postFormData, file, setFile, setFetchPost) => {
    try {
      const authToken = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('title', postFormData.postTitle);
      formData.append('desc', postFormData.postDesc);
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

      const responseData = response.data;
      if (response.status === 200) {
        toast.success('Post created successfully');
        console.log(responseData);
        setFile(null);
        setFetchPost(true);
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
  return {posts,fetchPost,cat,getPostByCategory,getPost,setcat,setFetchPost}
  
}






export function useUpdatePost(postFormData){

  const[post ,setPost] = useState("")
  const {postId} = useParams();


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
            console.log("sucess")
    
        }
        else {
            console.log("something went worng on updating")
        }
    } catch (error) {
        console.log(error)
        
    }
  }



  
return {
  updateContent , post , fetchData
}

}
