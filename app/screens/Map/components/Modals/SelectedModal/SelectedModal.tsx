import React, { useState } from "react";
import ModalLayout from "../ModalLayout";
import { Title } from "../../../../../shared/Title/Title";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../../../src/colors";
import RenderItem from "./RenderItem";
import { IDoc } from "../../../../../Types/Parties";

interface FavoriteModalProps {
  visible: boolean;
  hideModal: () => void;
}

const FavoriteModal = ({ visible, hideModal }: FavoriteModalProps) => {
  const [selected] = useState<IDoc[]>([
    {
      title: "hello",
      time: { nanoseconds: 0, seconds: 0 },
      access: "public",
      number_of_guests: 1,
    },
  ]);

  return (
    <ModalLayout
      visible={visible}
      hideModal={hideModal}
      title={
        <Title
          modalIcon={
            <AntDesign
              name={"star"}
              size={35}
              color={colors.accentColor}
              style={{ marginHorizontal: "5%" }}
            />
          }
          fontStyle={{ color: colors.text }}
          title={"Selected"}
          description={"Saved events"}
          containerStyle={{ alignItems: "center" }}
        />
      }
    >
      {selected.map((item, index) => (
        <RenderItem item={item} key={index} />
      ))}
    </ModalLayout>
  );
};

export default FavoriteModal;
