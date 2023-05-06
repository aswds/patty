import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { userReference } from "../../../Firebase/References";
import { auth } from "../../../../firebase";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { EventInvitation, IUser } from "../../../Types/User";
import { addNotificationForUser } from "./firebase/addNotificationForUser";
import { NotificationTypes } from "../../../Types/User";
const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const { current_user } = useTypedSelector((state) => state.user_state);
  const { updateUser } = useActions();

  useEffect(() => {
    const userRef = userReference(auth.currentUser?.uid!);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.data() as IUser;
      const conditionNewFollower = data.followers !== current_user.followers;
      const conditionEventInvites =
        data.event_invitation !== current_user.event_invitation;
      if (conditionNewFollower && data.followers) {
        const notification: NotificationTypes = {
          type: "follower",
          payload: data.followers[0],
        } as const;
        addNotificationForUser(notification, current_user.uid!);
      }
      if (conditionEventInvites && data.event_invitation) {
        const notification: NotificationTypes = {
          type: "invitation",
          payload: {
            from: data.event_invitation?.from,
            eventID: data.event_invitation?.eventID,
          },
        } as const;
        addNotificationForUser(notification, current_user.uid!);
      }
    });
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: Notification }) => (
    <View>
      <Text>{item.message}</Text>
      <Text>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text>No notifications.</Text>}
    />
  );
};

export default NotificationsScreen;
