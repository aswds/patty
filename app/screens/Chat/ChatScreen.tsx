import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { PUSHER_APP_KEY, PUSHER_CLUSTER } from "./config"; // Import your Pusher app key and cluster from a separate config file
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";

const pusher = Pusher.getInstance();
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function initPusher() {
      const pusher = Pusher.getInstance();

      await pusher.init({
        apiKey: process.env.PUSHER_APP_KEY!,
        cluster: process.env.PUSHER_CLUSTER!,
      });
      await pusher.connect();

      const channel = pusher.subscribe({
        channelName: "chat-room",
        onEvent: (event) => console.log(event),
      });

      //   channel.bind("new-message", (data) => {
      //     setMessages((prevState) =>
      //       GiftedChat.append(prevState, [
      //         {
      //           _id: data.id,
      //           text: data.text,
      //           createdAt: new Date(),
      //           user: {
      //             _id: data.userId,
      //             name: data.username,
      //           },
      //         },
      //       ])
      //     );
      //   });
    }
  }, []);

  const onSend = (newMessages = []) => {
    const message = {
      id: newMessages[0]._id,
      text: newMessages[0].text,
      userId: newMessages[0].user._id,
      username: newMessages[0].user.name,
    };

    // Send the message to the server
    fetch("https://your-chat-server.com/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: "user-id", // Replace with the user ID of the logged-in user
        name: "User Name", // Replace with the name of the logged-in user
      }}
    />
  );
};

export default ChatScreen;
