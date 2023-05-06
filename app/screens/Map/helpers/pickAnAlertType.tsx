type AlertType = "toCreate" | "toJoin" | "noPartyJoined" | "hostLeaving";

export type AlertConfig = {
  title: string;
  message: string;
  type?: AlertType;
  onCancelCallback?: () => void;
  cancelText?: string;
  okText?: string;
};

export function pickAlertErrors(type: AlertType): AlertConfig {
  switch (type) {
    case "toCreate":
      return {
        title: "Leaving a Joined Party",
        message:
          "Hey there! To create a party, you'll need to leave the currently joined party. Are you sure you want to leave?",
        type: "toCreate",
        okText: "stay",
        cancelText: "leave a party",
      };
    case "toJoin":
      return {
        title: "Leaving a Joined Party",
        message:
          "Hey there! To join a party, you'll need to leave the currently joined party. Are you sure you want to leave?",
        okText: "stay",
        cancelText: "leave a party",
      };
    case "noPartyJoined":
      return {
        title: "Join a party",
        message:
          "Hey there! To join a party, you'll need to leave the currently joined party. Are you sure you want to leave?",
        okText: "stay",
        cancelText: "leave a party",
      };
    case "hostLeaving":
      return {
        title: "Delete Party",
        message:
          "Hey there! The party will be deleted if you leave a party. Are you sure you want to leave?",
        okText: "Cancel",
        cancelText: "Delete",
      };
    default:
      throw new Error(`Unknown alert type: ${type}`);
  }
}
