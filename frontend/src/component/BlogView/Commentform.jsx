import React, { useState ,useEffect} from 'react'
import "../../css/commentform.css";
import "./Blogview"
import Commentcard from './Commentcard';
const Commentform=({post})=> {
    const [commentFormData , setCommentFormData] = useState({
        commentData : ""
    })

    const [comment , setComment] = useState([])

    useEffect(()=>{
        const getCommentById = async () => {
            console.log(post)
   
            try {
              const authToken = localStorage.getItem('token');
              const response = await fetch(`http://localhost:8000/api/v1/comment/getCommentById/${post._id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authToken}`
                }
              });
              if (response.ok) {
                const responseData = await response.json();
                setComment(responseData.comment);



                

              }
              else {
                console.log("error")
              }
            } catch (error) {
              console.log(error);
            }
        }
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
        console.log(commentFormData)
    }
    const createComment =async()=>{
        try {
            const authToken = localStorage.getItem('token')
            const response = await fetch(`http://localhost:8000/api/v1/comment/newComments/${post._id}`,{
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
        <div className="p-5 m-5 border-2" >
            <h1>ADD A COMMENT</h1>
            <form  onSubmit={handleOnSubmit}>
                <textarea class="" placeholder='Write your comment' rows="4"
              name='commentData' onChange={handleOnChange}></textarea>
                <button type="submit" class="bg-blue-500">Submit</button>
            </form>
            <br></br>
            <div className='w-full'>

                {
                     comment.map((comment) => (
                    <Commentcard comment={comment} />
                 ))
                }
            </div>


        </div>
    );
}

export default Commentform;