import "firebase/firestore";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import Button from "../../shared/Buttons/Button";
import { colors } from "../../src/colors";
interface InviteButtonProps {
  partyId: string;
  userId: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({ partyId, userId }) => {
  const [isUserInvited, setUserInvited] = useState<boolean>();
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
      text={isUserInvited ? "Invitation sent" : "Invite"}
      onPress={handleInvite}
      disabled={isUserInvited === true}
      style={{
        backgroundColor: isUserInvited ? undefined : colors.doneButtonBG,
      }}
      textStyled={{
        color: colors.doneButtonText,
      }}
    />
  );
};

export default InviteButton;
