import { PetCareAPI } from "../../APIs/PetCareAPI";

export const GetCHatsMessages = async (username,chatName) => {
  const response = await PetCareAPI.get("/Account/GetChatsMessages", {
    params: {username:username, chatName: chatName },
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  var messages = response.data.messages;
  console.log(messages)
  return messages;
};
