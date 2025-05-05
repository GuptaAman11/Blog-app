import React, { useState ,useEffect} from 'react'
import "./Blogview"
import Commentcard from './Commentcard';
const Commentform=({post ,setfetchComment})=> {
    const [commentFormData , setCommentFormData] = useState({
        commentData : ""
    })

    const [comment , setComment] = useState([])

    const getCommentById = async () => {
      console.log(post)

      try {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/comment/getCommentById/${post._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (response.ok) {
          const responseData = await response.json();
          setComment(responseData?.comment);
          setfetchComment(true)



          

        }
        else {
          console.log("error")
        }
      } catch (error) {
        console.log(error);
      }
  }


    useEffect(()=>{
                getCommentById();
    },[post])






    const handleOnChange =(e)=>{
        const {name , value} =e.target 
        setCommentFormData({
            ...commentFormData , 
            [name] : value
        })
    }

    const handleOnSubmit =async (e)=>{

        e.preventDefault()
        await createComment()
        await getCommentById();
        
        console.log(commentFormData)
    }
    const createComment =async()=>{
        try {
            const authToken = localStorage.getItem('token')
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/comment/newComments/${post._id}`,{
                method : 'POST' , 
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${authToken}`
            }
            , 
                body :JSON.stringify({
                    comment : commentFormData.commentData 
            }),
                    
                
            })
            if(response.ok) {

                const responseData = await response.json()
                console.log("comment created sucessfully")
            }
        } catch (error) {
            console.log(error)
            
        }
    }




    return (
        <>
        <div className="p-5 m-5 border-2 rounded-lg shadow-md bg-white">
  <h1 className="text-2xl font-bold text-blue-500 mb-4">ADD A COMMENT</h1>
  <form onSubmit={handleOnSubmit} className="mb-4">
    <textarea
      className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
      placeholder="Write your comment"
      rows="4"
      name="commentData"
      onChange={handleOnChange}
    ></textarea>
    <button type="submit" className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
      Submit
    </button>
  </form>
  
</div>
<div className="w-full space-y-4">
  <>
  {
    comment?.length===0 ? <div>"comment not found" </div> :
  
    comment.map((comment) => (
      <Commentcard comment={comment} />
    ))
}
    </>
  </div>
</>

    );
}

export default Commentform;