import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

async function sendFCM() {
  await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `key=AAAA7SuIcdA:APA91bHeTAbhsWYEmOlHdhe7BN6PjaHksnpW4WO7syXePKx8gMHry34HHcZLqi79ZYqpLngZmPG9ox0lR0y9zNCX1d9lGe4TR4msoQitfhg_pw9YWg9Y7i9E_YvCNRJcKH1SDlPaiyuD`,
    },
    body: JSON.stringify({
      to: "a87e9651bcec82c218d593713bcaf26562285b8f874f98da10c49e3a32d30120",
      priority: "normal",
      data: {
        experienceId: "@bendzeit/patty",
        scopeKey: "@bendzeit/patty",
        title: "📧 You've got mail",
        message: "Hello world! 🌐",
      },
    }),
  });
  console.log(
    JSON.stringify({
      to: "a87e9651bcec82c218d593713bcaf26562285b8f874f98da10c49e3a32d30120",
      priority: "normal",
      data: {
        experienceId: "@bendzeit/patty",
        scopeKey: "@bendzeit/patty",
        title: "📧 You've got mail",
        message: "Hello world! 🌐",
      },
    })
  );
}

const usePushNotification = () => {
  const [devicePushToken, setDevicePushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setDevicePushToken(token)
    );
    sendFCM();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null; // We don't need to render anything with this hook
};

export default usePushNotification;
