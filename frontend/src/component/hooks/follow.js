import { useState } from "react";
import { toast } from "react-toastify";

export function useFollow () {
    const follow = async (userId) => {
      try {
        const authToken = localStorage.getItem('token');
  
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/follow/follow/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });
        const ressponseData = await response.json();

        if (response.ok) {
            toast.success("followed sucessfully")
             return true ;
  
        }else{
            toast.error(ressponseData.message);
        }
      } catch (error) {
        console.log(error);
      }
    
    }
    return {follow }
  }

  export function useGetFollow() {
    const [isFollow , setIsFollow] = useState(false)
    const[followDetails , setFollowDetails] = useState()
    const getFollow = async(userId) =>{
        try {
            const authToken = localStorage.getItem('token');
      
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/follow/isfollow/${userId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            });
      
            if (response.ok) {
                 const ressponseData = await response.json();
                 setFollowDetails(ressponseData.followDetails)
                 console.log("this is from hook of follow ", ressponseData)
                 if(ressponseData.isFollow === false){
                    setIsFollow(false)
                    return true ;
                 }
                 setIsFollow(true)
                 return true ;
      
            }
          } catch (error) {
            console.log(error);
          }

    }
    return {getFollow , isFollow , followDetails}
  }