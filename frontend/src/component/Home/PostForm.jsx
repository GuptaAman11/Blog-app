import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddPost } from '../hooks/post';

const PostForm = ({ setFetchPost }) => {
  const { addPost } = useAddPost();
  const [file, setFile] = useState(null);

  const [postFormData, setPostFormData] = useState({
    postTitle: '',
    postDesc: '',
    postCategory: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPostFormData({
      ...postFormData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await addPost(postFormData, file, setFile, setFetchPost);
  };

  return (
    <div className="p-4 flex items-center m-10 shadow-lg">
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
        <div className="p-2 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Post Your Content</h2>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="postTitle"
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
                placeholder="Enter a description"
                required
                onChange={handleOnChange}
                className="w-full py-2 focus:outline-none border-b border-gray-300"
              ></textarea>
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
