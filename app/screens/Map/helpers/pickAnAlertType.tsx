type AlertType =
  | "toCreate"
  | "toDeleteParty"
  | "toJoin"
  | "noPartyJoined"
  | "hostLeaving"
  | "hostLeavingToJoin"
  | "downloadPost"
  | "deletePost"
  | "deleteAnnouncement"
  | "leaveParty"
  | "noInternetConnection";

export type AlertConfig = {
  title: string;
  message: string;
  type?: AlertType;
  onCancelCallback?: () => void;
  cancelText?: string;
  okText?: string;
  onOkCallback?: () => void;
};

export function pickAlertText(type: AlertType): AlertConfig {
  switch (type) {
    case "toCreate":
      return {
        title: "Leaving a Joined Party 🚶‍♂️🎉",
        message:
          "Hey there! To create a party, you'll need to leave the currently joined party. Are you sure you want to leave?",
        type: "toCreate",
        okText: "stay",
        cancelText: "leave a party",
      };
    case "toDeleteParty":
      return {
        title: "Delete Party 🗑️",
        message: "Are you sure you want to delete this party?",
        okText: "Cancel",
        cancelText: "Delete",
      };
    case "toJoin":
      return {
        title: "Leaving a Joined Party 🚶‍♂️🎉",
        message:
          "Hey there! To join a party, you'll need to leave the currently joined party. Are you sure you want to leave?",
        okText: "stay",
        cancelText: "leave a party",
      };
    case "leaveParty":
      return {
        title: "Leaving party 🚶‍♂️🎉",
        message: "Are you sure you want to leave?",
        okText: "stay",
        cancelText: "leave a party",
      };
    case "noPartyJoined":
      return {
        title: "Join a party🎉",
        message: "Hey there! You need to join a party first.",
        okText: "ok",
      };
    case "hostLeaving":
      return {
        title: "Delete Party",
        message:
          "Hey there! The party will be deleted if you leave a party. Are you sure you want to leave?",
        okText: "Cancel",
        cancelText: "Delete",
      };
    case "hostLeavingToJoin":
      return {
        title: "Delete Party 🗑️",
        message:
          "Hey there! Your party will be deleted if you join other party. Are you sure you want to delete your party?",
        okText: "Cancel",
        cancelText: "Delete",
      };

    case "deletePost": {
      return {
        title: "Delete Post 🗑️",
        message: "Are you sure you want to delete your post?",
        okText: "Cancel",
        cancelText: "Delete",
      };
    }
    case "deleteAnnouncement": {
      return {
        title: "Delete Announcement 🗑️",
        message:
          "Hey there! Are you sure you want to delete your announcement?",
        okText: "Cancel",
        cancelText: "Delete",
      };
    }
    case "downloadPost": {
      return {
        title: "Download",
        message: "Would you like to download this media from the post?",
        okText: "Cancel",
        cancelText: "Download",
      };
    }
    case "noInternetConnection": {
      return {
        title: "Connection lost 🔌",
        message:
          "We're sorry, but it seems like your connection has been lost.",
        okText: "ok",
      };
    }
    default:
      throw new Error(`Unknown alert type: ${type}`);
  }
}
