import React, { useState , useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAddPost, useAiToGetDescription, useGetPost } from '../hooks/post';
import { useSupplier } from '../../context/postRefresh';

const PostForm = () => {
  const { addPost } = useAddPost();
  const {aiDesc , aiDescription} = useAiToGetDescription()
  const {getPost} = useGetPost()
  const [file, setFile] = useState(null);
  const {triggerUpdate} = useSupplier()
  const [postFormData, setPostFormData] = useState({
    postTitle: '',
    postCategory: '',
  });
  const [postDescription , setPostDescription] = useState()

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPostFormData({
      ...postFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (aiDesc) {
      setPostDescription(aiDesc); 
    }
  }, [aiDesc]);
  

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(postFormData)
    const success = await addPost(postFormData,postDescription , file, setFile);
    if (success) {
      setPostFormData({
        postTitle: '',
        postDesc: '',
        postCategory: 'All_Category',
      });
      setFile(null);
      triggerUpdate()

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    }
  };

  const aiEvent = async(e) => {
    e.preventDefault() ;
    if (!postFormData.postTitle || postFormData.postTitle.trim() === "") {
      toast.error("Title cannot be empty");
    }else{
      await aiDescription(postFormData.postTitle)
    }
    

  }
 

  return (
    <div className="p-4 flex flex-col md:flex-row items-center m-4 md:m-10 shadow-lg">
      {/* Image container */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.7Grmlv6D3kK-sTfJbMYEawHaFp&pid=Api&P=0&h=180"
          alt="Your Image"
          className="w-full max-w-md mx-auto h-auto rounded-full"
        />
      </div>

      {/* Form container */}
      <div className="w-full md:w-1/2 p-4 md:p-8">
        <div className="p-2 rounded shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Post Your Content</h2>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="postTitle"
                value={postFormData.postTitle}
                placeholder="Enter a title"
                onChange={handleOnChange}
                required
                className="w-full py-2 focus:outline-none border-b border-gray-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                onChange={handleOnChange}
                name="postCategory"
                value={postFormData.postCategory}
                className="w-full py-2 focus:outline-none border-b border-gray-300"
              >
                <option value="All_Category">All Category</option>
                <option value="Music">Music</option>
                <option value="Movies">Movie</option>
                <option value="Sport">Sport</option>
                <option value="Tech">Tech</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                name="postDesc"
                value={postDescription}
                placeholder="Enter a description"
                required
                onChange={(e)=>{setPostDescription(e.target.value)}}
                className="w-full py-2 focus:outline-none border-b border-gray-300"
              ></textarea>
              <button className='bg-blue-500 rounded-md p-2 text-white' onClick={aiEvent}>Generate</button>
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-600">
                File
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full py-2 focus:outline-none border-b border-gray-300"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
