import React, { useEffect, useState } from "react";
import "../../css/postform.css";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const [file, setfile] = useState("");

  const [postFormData, setpostFormData] = useState({
    postTitle: "",
    postDesc: "",
    postPicture: "",
  });

  const [post, setPost] = useState("");
  const { postId } = useParams();

  const url = postFormData.picture
    ? postFormData.picture
    : "https://tse3.mm.bing.net/th?id=OIP.IaUnm6JD3StW_ea8WMVjZgHaE3&pid=Api&P=0&h=180";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8000/api/v1/post/getPostByPostId/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setPost(responseData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const uploadImage = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);

        try {
          const response = await fetch(
            "http://localhost:8000/api/v1/post/file/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log("this is the response data", responseData);
            postFormData.postPicture = responseData;
          } else {
            console.error("Image upload failed");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };

    uploadImage();
  }, [file]);

  const updateContent = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/v1/post/updatePost/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            title: postFormData.postTitle,
            desc: postFormData.postDesc,
            picture: postFormData.postPicture,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setPost(responseData);
        console.log("sucess");
      } else {
        console.log("something went worng on updating");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setpostFormData({
      ...postFormData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    updateContent();

    console.log(postFormData);
  };



  return (

    <>
    <div className="mt-36">
         <PostCard post={post} />
     </div>
    <div className="  p-4 flex items-center m-10 shadow-lg">
    {/* Image on the right */}
        <div className="w-1/2">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.7Grmlv6D3kK-sTfJbMYEawHaFp&pid=Api&P=0&h=180"
          alt="Your Image"
          className="w-full h-auto rounded-full"
        />
        </div>


  
    {/* Form on the left */}
    <div className="w-1/2 p-8">
      <div className=" p-2 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Post Your Content</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600">Title</label>
            <input
              type="text"
              id="title"
              name="postTitle"
              placeholder="Enter a title"
              defaultValue={post.title}
              onChange={handleOnChange}
              required
              className="w-full py-2 focus:outline-none border-b border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-600">Category</label>
            <select
              onChange={handleOnChange}
              name="postCategory"
              className="w-full py-2 focus:outline-none border-b border-gray-300"
            >
              <option value="All_Category">All Category</option>
              <option value="Music">Music</option>
              <option value="Fashion">Fashion</option>
              <option value="Sport">Sport</option>
              <option value="College">College</option>
              <option value="Article">Article</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600">Description</label>
            <textarea
              id="description"
              name="postDesc"
              placeholder="Enter a description"
              required
              onChange={handleOnChange}
              defaultValue={post.desc}
              className="w-full py-2 focus:outline-none border-b border-gray-300"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-600">File</label>
            <input
              type="file"
              onChange={(e) => setfile(e.target.files[0])}
              className="w-full py-2 focus:outline-none border-b border-gray-300"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </>



















    // <div className="flex m-4 -mt-20 justify-center gap-20">
    //   <div className="mt-36">
    //     <PostCard post={post} />
    //   </div>
    //   <div className="Postform">
    //     <div className="form-container">
    //       <h2>Post Your Content</h2>
    //       <form onSubmit={handleOnSubmit}>
    //         <div className="form-group">
    //           <label htmlFor="title">Title</label>
    //           <input
    //             type="text"
    //             id="title"
    //             defaultValue={post.title}
    //             name="postTitle"
    //             placeholder="Enter a title"
    //             onChange={handleOnChange}
    //             required
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="description">Description</label>
    //           <textarea
    //             id="description"
    //             name="postDesc"
    //             placeholder="Enter a description"
    //             defaultValue={post.desc}
    //             required
    //             onChange={handleOnChange}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <input type="file" onChange={(e) => setfile(e.target.files[0])} />
    //           <button className="bg-blue-500 mt-4"type="submit">Update</button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UpdatePost;