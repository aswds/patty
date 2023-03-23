import React, {useEffect, useState} from "react";
import ChatList from "./components/ChatList";
import ChatScreen from "./components/ChatScreen";

export default function Chat() {
  const Messages = [
    {
      id: "1",
      name: "Jenny Fe",
      userImg: require("../../../assets/images/noImage-01.png"),
      messageTime: "4 mins ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
      username: "@fifd",
    },
    {
      id: "2",
      name: "John Doe",
      userImg: require("../../../assets/images/noImage-01.png"),
      messageTime: "2 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
      username: "@sntonette",
    },
    {
      id: "3",
      name: "Ken William",
      userImg: require("../../../assets/images/noImage-01.png"),
      messageTime: "1 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
      username: "@samantha",
    },
    {
      id: "4",
      name: "Selina Paul",
      userImg: require("../../../assets/images/noImage-01.png"),
      messageTime: "1 day ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
      username: "@karianne",
    },
    {
      id: "5",
      name: "Christy Alex",
      userImg: require("../../../assets/images/noImage-01.png"),
      messageTime: "2 days ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
      username: "@kamren",
    },
    {
      id: "6",
      name: "Jenny Fe",
      userImg: require("../../../assets/images/noImage-01.png"),
      messageTime: "4 mins ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
      username: "@ken",
    },
    {
      id: "7",
      name: "John Doe fhdsafohdsajifjsdoifp",
      image: require("../../../assets/images/noImage-01.png"),
      messageTime: "2 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
      username: "@Elwyn.Skiles",
    },
    {
      id: "8",
      name: "Ken William",
      username: "@Maxime_Nienow",
      userImg: require("../../../assets/images/noImage-01.png"),
      messageTime: "1 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    // {
    //   id: "9",
    //   name: "Selina Paul",
    //   userImg: require("../../../assets/images/noImage-01.png"),
    //   messageTime: "1 day ago",
    //   messageText:
    //     "Hey there, this is my test for a post of my social app in React Native.",
    // },
    // {
    //   id: "10",
    //   name: "Christy Alex",
    //   userImg: require("../../../assets/images/noImage-01.png"),
    //   messageTime: "2 days ago",
    //   messageText:
    //     "Hey there, this is my test for a post of my social app in React Native.",
    // },
  ];
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  return (
    <ChatScreen>
      <ChatList data={Messages} />
    </ChatScreen>
  );
}
