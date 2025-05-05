// import React from 'react'

// const LikeHook = () => {
    

//     const likePost =async() => {
//        try {
//         const postId = '65162af62140557eb631197f'
//          const authToken = localStorage.getItem('token')
 
//          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/like/likeInPost/${postId}` , {
//              method : 'POST' ,
//              headers : {
//                  'Content-Type' : 'application/json',
//                  'Authorization': `Bearer ${authToken}`
//              }
//          })
 
//          if(response.ok){
//              const responseData = await response.json()
//              console.log(responseData)
//          }
 
//        } catch (error) {

//             console.log(error)
        
//        }
//     }
    
//   return (
//     <div>
//     </div>
//   )
// }

// export default LikeHook
