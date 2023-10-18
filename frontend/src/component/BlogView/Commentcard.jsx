


import React from "react";
import "../../css/commentcard.css";


const Commentcard = ({comment}) => {
    return (
        <div>
            <div className="heading">
                <h1>Post</h1>
            </div>
            <div className="container">
               
                <h3>{comment.comment}</h3>
                <h3>{comment.author.name}</h3>
            </div>
        </div>
    );
}

export default Commentcard;
