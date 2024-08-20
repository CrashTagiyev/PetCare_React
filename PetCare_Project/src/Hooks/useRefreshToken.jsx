import { jwtDecode } from 'jwt-decode';
import React from 'react'
import PetCareAPI from '../APIs/PetCareAPI';
import { useAuth } from './useAuth';

const useRefreshToken = () => {
    const { setUser } = useAuth();

    const refresh = async () => {
        const response = await PetCareAPI.post('/Account/RefreshToken', {
            withCredentials: true
        });
        localStorage.setItem("accessToken",response.data.accessToken)
        const decodedToken = jwtDecode(response.data.accessToken);
        const roles = decodedToken.role;
        const username = decodedToken.username;
        const emailAddress = decodedToken.email;
        const profileImage = decodedToken.profileimageurl;
        const id = decodedToken.id;
        localStorage.setItem("accessToken", accessToken);
        console.log(message);
        console.log(statusCode);
        const user = {
            id:id,
          username:username,
          emailAddress:emailAddress,
          roles:roles,
          profileImage:profileImage,
          accessToken:response.data.accessToken,
        };
        setUser(user)
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken