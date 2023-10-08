import React from 'react'
import { useLocation } from 'react-router-dom';


const CategroyWisePost = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    console.log(category)
  return (
    <div>
      <h1>
        this is the catergory wise post
      </h1>
    </div>
  )
}

export default CategroyWisePost
