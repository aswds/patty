import React from "react";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const onRefresh = (setRefreshing) => {
  setRefreshing(true);
  wait(2000).then(() => setRefreshing(false));
};
