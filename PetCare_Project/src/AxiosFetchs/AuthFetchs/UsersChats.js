import { PetCareAPI } from "../../APIs/PetCareAPI";


export const GetChats = async (userName) => {
    const response = await PetCareAPI.get("/Account/GetUsersChats", {
        params: { userName: userName },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
    return response.data.chats;
};

