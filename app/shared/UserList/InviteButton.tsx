import "firebase/firestore";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import Button from "../../shared/Buttons/Button";
import { colors } from "../../src/colors";
import { useTypedSelector } from "../../hooks/useTypedSelector";
interface InviteButtonProps {
  partyId: string;
  userId: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({ partyId, userId }) => {
  const [isUserInvited, setUserInvited] = useState<boolean>();
  const onEvent = useTypedSelector(
    (state) => state.user_state.current_user.events.onEvent
  );
  const isHost = userId === onEvent;

  const handleInvite = async () => {
    const db = getFirestore();
    const userRef = doc(db, `USERS`, `${userId}`);

    await updateDoc(userRef, {
      invited: arrayUnion(partyId),
    }).then(() => {
      setUserInvited(true);
    });

    // userRef
    //   .update({
    //     invited: firebase.firestore.FieldValue.arrayUnion(partyId),
    //   })
    //   .then(() => {
    //     console.log("Party invitation sent successfully!");
    //   })
    //   .catch((error) => {
    //     console.error("Error sending party invitation:", error);
    //   });
  };

  return (
    <Button
      text={isUserInvited ? "Invitation sent" : !isHost ? "Invite" : "Host"}
      onPress={handleInvite}
      disabled={isUserInvited || isHost}
      style={{
        backgroundColor:
          isUserInvited || isHost ? undefined : colors.doneButtonBG,
      }}
      textStyled={{
        color: colors.doneButtonText,
      }}
    />
  );
};

export default InviteButton;
