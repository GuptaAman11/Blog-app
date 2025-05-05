import React from 'react'
import PostCard from './PostCard'
import PostForm from './PostForm'
import { useEffect ,useState } from 'react'
import {Link} from 'react-router-dom'
import Category from './Category'
import { useGetPost } from '../hooks/post'
import { useSupplier } from '../../context/postRefresh'



const Home = ({searchQuery}) => {
  
  const [loadMore , setLoadMore] = useState(1);
  const [prevSearchQuery , setprevSearchQuery] = useState("");
  console.log("this is home search query" , searchQuery)
  console.log(prevSearchQuery, "this is prevoius seaarch qyeyt")

  const {setposts , cat,posts,getPostByCategory,setcat,getPost, queryWalaPost , setQueryWalaposts } = useGetPost() 
  // console.log(queryWalaPost , "this si query wala post") ;
  const {shouldUpdate} = useSupplier()
  // console.log(shouldUpdate, "should update");
  const postToshow =  queryWalaPost.length === 0 ? posts : queryWalaPost;


  useEffect(()=>{
    if(prevSearchQuery !== "" && searchQuery === ""){
      setposts([]);
      setQueryWalaposts([]) ;
      setprevSearchQuery(searchQuery) ;
      getPost(loadMore , searchQuery);
      return ;
    }
    if(searchQuery  !== prevSearchQuery ){
      setLoadMore(1);
      setQueryWalaposts([]) ;
      setprevSearchQuery(searchQuery) ;
    }
    
    if(cat){
      getPostByCategory(cat)
    }
    else{
      getPost(loadMore , searchQuery)
    }
  },[loadMore , searchQuery])

  return (
    <div>
          <div>
          
            <PostForm />

          </div>
          
          <div className="flex justify-center">
            <button className='text-white-700 text-sm font-semibold mb-1 bg-black-900 p-4'>
              <Category setcat={setcat}/>
            </button>
          </div>
          <div className='post flex flex-wrap justify-center gap-5'>
            
            {
              postToshow?.map((post)=>(

                <>
                <Link>
                  <PostCard post={post} />
                  </Link> 
              </>


              ))
            }

          </div>
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setLoadMore(loadMore + 1)} 
              className="bg-blue-500 text-white text-sm font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
            >
                Load More
            </button>
        </div>    
  </div>
  )
}

export default Home 
