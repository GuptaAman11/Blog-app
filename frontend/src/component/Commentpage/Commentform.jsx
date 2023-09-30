import React from 'react'
import "../../css/commentform.css";
const CommentForm=()=> {
    return (
        <div className='comment-form'>
            <h1>ADD A COMMENT</h1>
            <input type='text' className='comment-input' placeholder='Write your comment' value={Comment} />
            <button className='submit'>Submit</button>
        </div>
    );
}

export default CommentForm;