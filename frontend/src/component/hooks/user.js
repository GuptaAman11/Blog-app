import { useState } from "react"
import { toast } from 'react-toastify';

export function useGetUserInfo() {
    const [userDetails , setUserDetails] = useState();

    const getUserInfo = async(userId) => {
        try {
            const authToken = localStorage.getItem('token')
            const response = await fetch(`http://localhost:8000/api/v1/users/userinfo/${userId}`, {
                method : 'POST' , 
                headers :{
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${authToken}`
                }
            })
            if(response.ok){
                const responseData = await response.json()
                setUserDetails(responseData)
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }
    return {userDetails , getUserInfo}
}