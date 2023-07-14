import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import UserList from "../../../shared/UserList/UserList";
import { fetchUsers } from "../../../shared/UserList/fetchGuests";
import { IUser } from "../../../Types/User";
import UserItem from "../../../shared/UserList/UserItem";
import { connectStorageEmulator } from "firebase/storage";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import PartyUserItem from "../../../shared/UserList/PartyUserItem";

interface MinglesProps {
  guestsUIDs: string[];
}

const Mingles: FC<MinglesProps> = ({ guestsUIDs }) => {
  const [guests, setGuests] = useState<IUser[]>([]);
  const { current_user } = useTypedSelector((state) => state.user_state);
  useEffect(() => {
    fetchUsers(guestsUIDs).then((guests) => {
      setGuests(guests);
    });
  }, []);

  return (
    <FlatList
      data={guests}
      renderItem={({ item, index }) => (
        <PartyUserItem user={item} onSendMinglePress={() => {}} key={index} />
      )}
      style={{
        flex: 1,
        marginVertical: "5%",
        marginHorizontal: -20,
      }}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Mingles;

const styles = StyleSheet.create({});
