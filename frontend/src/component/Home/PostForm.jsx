import React, { useEffect, useState } from 'react'
import '../../css/postform.css'


const PostForm =() => {
  const [file , setfile] = useState('')

  const [postFormData , setpostFormData] = useState({
    postTitle : ""  , postDesc : "" ,postPicture :""
  })


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
          desc : postFormData.postDesc
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
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);
        console.log(file);

        const formDataWithField = new FormData();
        formDataWithField.append('data', data);
  
        // You may want to send an API request with 'data' here if needed
        // Make sure to define the purpose of this request
        try {

          const response = await fetch('http://localhost:8000/api/v1/post/file/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: formDataWithField,
          });


          if (response.ok) {
            const responseData = await response.json();
            postFormData.postPicture = responseData.data;
            console.log(responseData);
          }
    

  
          // Handle the response as needed
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    getImage();
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
