import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { MapStackScreenProps } from "../../../../Types/MapStack/ScreenNavigationProps";
import { IUser } from "../../../../Types/User";
import UserItem from "../../../../shared/UserList/UserItem";
import UserList from "../../../../shared/UserList/UserList";
import { fetchUsers } from "../../../../shared/UserList/fetchGuests";
import { colors } from "../../../../src/colors";
const Invitation = ({
  navigation,
  route,
}: MapStackScreenProps<"InvitationScreen">) => {
  const [userUIDs, _] = useState<string[] | undefined>(route.params?.users);
  // const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const users = [
    {
      uid: "1",
      name: "John",
      surname: "Doe",
      username: "johndoe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      uid: "2",
      name: "Jane",
      surname: "Smith",
      username: "janesmith",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      uid: "3",
      name: "Michael",
      surname: "Johnson",
      username: "michaeljohnson",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      uid: "4",
      name: "Emily",
      surname: "Brown",
      username: "emilybrown",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      uid: "5",
      name: "David",
      surname: "Lee",
      username: "davidlee",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      uid: "6",
      name: "Jessica",
      surname: "Wang",
      username: "jessicawang",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      uid: "7",
      name: "Christopher",
      surname: "Martinez",
      username: "christophermartinez",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      uid: "8",
      name: "Olivia",
      surname: "Davis",
      username: "oliviadavis",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      uid: "9",
      name: "Andrew",
      surname: "Rodriguez",
      username: "andrewrodriguez",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      uid: "10",
      name: "Sophia",
      surname: "Garcia",
      username: "sophiagarcia",
      image: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      uid: "11",
      name: "Matthew",
      surname: "Wilson",
      username: "matthewwilson",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      uid: "12",
      name: "Ava",
      surname: "Taylor",
      username: "avataylor",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      uid: "13",
      name: "Daniel",
      surname: "Anderson",
      username: "danielanderson",
      image: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      uid: "14",
      name: "Isabella",
      surname: "Hernandez",
      username: "isabellahernandez",
      image: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      uid: "15",
      name: "Ethan",
      surname: "Moore",
      username: "ethanmoore",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
    },
  ];

  // useFocusEffect(
  //   useCallback(() => {
  //     setIsLoading(true);
  //     if (userUIDs && userUIDs?.length > 0) {
  //       fetchUsers(userUIDs)
  //         .then((users) => {
  //           setUsers(users);
  //           setIsLoading(false);
  //         })
  //         .catch(() => {
  //           setIsLoading(false);
  //         });
  //     } else {
  //       setIsLoading(false);
  //     }
  //   }, [])
  // );
  return (
    <UserList
      isLoading={isLoading}
      users={users}
      headerTitle="Invitation"
      style={{ backgroundColor: colors.background }}
      renderItem={({ item, index }) => (
        <UserItem _user={item} key={index} showInviteButton />
      )}
    />
  );
};

export default Invitation;

const styles = StyleSheet.create({});
