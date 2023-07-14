import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { userReference } from "../../../../Firebase/References";
import { EventInvitation, IUser } from "../../../../Types/User";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { colors } from "../../../../src/colors";
interface NotificationTypes {
  type: "follower" | "invitation";
  payload: string | EventInvitation;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const { current_user } = useTypedSelector((state) => state.user_state);
  const { updateUser } = useActions();
  const auth = getAuth();
  useEffect(() => {
    const userRef = userReference(auth.currentUser?.uid!);
    const unsub = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.data() as IUser;
      const conditionNewFollower = data.followers !== current_user.followers;
      const conditionEventInvites =
        data.event_invitation !== current_user.event_invitation;
      if (conditionNewFollower && data.followers) {
        setNotifications([
          ...notifications,
          {
            type: "follower",
            payload: data.followers[0],
          },
        ]);
        // updateUser({
        //   ...current_user,
        //   followers: data.followers,
        // });
      }
      if (conditionEventInvites && data.event_invitation) {
        setNotifications([
          ...notifications,
          {
            type: "invitation",
            payload: {
              from: data.event_invitation?.from,
              eventID: data.event_invitation?.eventID,
            },
          },
        ]);
        // {
        //     type: "invitation",
        //     payload: {
        //       from: data.event_invitation?.from,
        //       eventID: data.event_invitation?.eventID,
        //     },
        //   },
        updateUser({
          ...current_user,
          followers: data.followers,
          event_invitation: data.event_invitation,
        });
      }
    });
    return () => unsub();
  }, []);
  return (
    <TouchableOpacity>
      <Ionicons name="notifications" size={30} color={colors.accentColor} />
      {/* <FlatList data={notifications}  /> */}
    </TouchableOpacity>
  );
};

export default Notification;

const styles = StyleSheet.create({});
