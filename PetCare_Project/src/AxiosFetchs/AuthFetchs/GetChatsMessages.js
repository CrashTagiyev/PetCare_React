import { PetCareAPI } from "../../APIs/PetCareAPI";

export const GetCHatsMessages = async (chatName) => {
  const response = await PetCareAPI.get("/Account/GetChatsMessages", {
    params: { chatName: chatName },
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  var messages = response.data.messages;
  console.log(messages)
  return messages;
};
