import React, { useEffect, useState } from 'react'
import '../../css/postform.css'


const PostForm =() => {
  const [file , setfile] = useState('')

  const [postFormData , setpostFormData] = useState({
    postTitle : ""  , postDesc : "" ,postPicture :""
  })

  const url = postFormData.picture ? postFormData.picture : 'https://tse3.mm.bing.net/th?id=OIP.IaUnm6JD3StW_ea8WMVjZgHaE3&pid=Api&P=0&h=180';



  const addPost = async()=>{
    try {
      const authToken = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8000/api/v1/post/createPost`, {
        method : 'POST' , 
        headers :{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
        , 
       body :JSON.stringify({
          title : postFormData.postTitle ,
          desc : postFormData.postDesc,
          picture : postFormData.postPicture
        }),
    })

    const responseData = await response.json();
    if(response.ok){
      console.log(responseData)
    }

    else {
      console.log(response.error)
    } 
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(() => {
    const uploadImage = async () => {
      if (file) {
        const formData = new FormData();
        formData.append('name',file.name)
        formData.append('file', file);

        try {
          const response = await fetch('http://localhost:8000/api/v1/post/file/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log("this is the response data" ,responseData);
            postFormData.postPicture = responseData
          } else {
            console.error('Image upload failed');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };

    uploadImage();
  }, [file]);
  
  

  const handleOnChange =(e)=>{
    const {name ,value} = e.target
      setpostFormData({

        ...postFormData , 
        [name] : value


      })
  }

  const handleOnSubmit =async(e)=>{
    e.preventDefault();
    await addPost();
    console.log(postFormData)
  }

  return (

    <div className="Postform">
      <div className="form-container">
        <h2>Post Your Content</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="postTitle"
              placeholder="Enter a title"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="postDesc"
              placeholder="Enter a description"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input type='file' onChange={(e)=>setfile(e.target.files[0])}/>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
      <div>

      </div>
    </div>
  );
}



   

export default PostForm

