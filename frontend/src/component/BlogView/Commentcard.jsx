import React from "react";


const Commentcard = ({comment}) => { 
    console.log(comment)
    return (
        <div>
            <div class="w-full flex border-2 m-3 ">
                <img class="user-profile-image m-2" src=""></img>
                <div class="comment-text w-full m-2">
                    <p><strong></strong> {comment.comment} </p>
                </div>
            </div>
               
            </div>
    );
}

export default Commentcard;