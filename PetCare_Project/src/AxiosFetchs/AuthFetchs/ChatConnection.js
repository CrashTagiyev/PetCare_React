import { BASE_URL } from "../../APIs/PetCareAPI";
import { HubConnectionBuilder } from "@microsoft/signalr";

export const CreateChatConnection = async (username, chatName) => {
  var connection = new HubConnectionBuilder()
    .withUrl(BASE_URL + "/chathub", {
      withCredentials: true,
    })
    .withAutomaticReconnect()
    .build();

  let messages = [];

  connection.on("GetConnectedChatsMessages", (receivedMessages) => {
    messages = receivedMessages;
  });
  connection.on("SendMessageToChat", (messages) => {
    return messages;
  });
  try {
    await connection.start();
    await connection.invoke("CreateConnection", { username, chatName });
  } catch (error) {
    console.error("Connection failed: ", error);
  }
  console.log(messages);
  return {
    connection: connection,
    messages: messages,
  };
};
