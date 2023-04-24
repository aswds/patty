import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import firebase from "firebase/app";
import "firebase/database";

const PartyStats = () => {
  const [numSongsPlayed, setNumSongsPlayed] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [partyStartTime, setPartyStartTime] = useState(null);

  useEffect(() => {
    // Set up listeners for party stats
    // const numSongsPlayedRef = firebase.database().ref('partyStats/numSongsPlayed');
    // numSongsPlayedRef.on('value', (snapshot) => {
    //   setNumSongsPlayed(snapshot.val());
    // });

    // const leaderboardRef = firebase.database().ref('partyStats/leaderboard');
    // leaderboardRef.on('value', (snapshot) => {
    //   const leaderboardData = snapshot.val();
    //   const leaderboardArray = Object.keys(leaderboardData).map((key) => ({
    //     id: key,
    //     ...leaderboardData[key],
    //   }));
    //   setLeaderboard(leaderboardArray);
    // });
    // const partyStartTimeRef = firebase.database().ref('partyStats/partyStartTime');
    // partyStartTimeRef.on('value', (snapshot) => {
    //   setPartyStartTime(snapshot.val());
    // });

    // Clean up listeners on unmount
    return () => {
      //   numSongsPlayedRef.off();
      //   leaderboardRef.off();
      //   partyStartTimeRef.off();
    };
  }, []);

  const calculateHoursUp = () => {
    if (!partyStartTime) {
      return null;
    }
    const now = new Date().getTime();
    const partyStart = new Date(partyStartTime).getTime();
    const hoursUp = Math.floor((now - partyStart) / (1000 * 60 * 60));
    return hoursUp;
  };

  return (
    <View>
      <Text>Number of songs played: {numSongsPlayed}</Text>
      <Text>Party has been up for: {calculateHoursUp()} hours</Text>
    </View>
  );
};

export default PartyStats;
