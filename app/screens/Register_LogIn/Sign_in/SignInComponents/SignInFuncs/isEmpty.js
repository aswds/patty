import React from "react";

export default function isEmpty({ email, password }) {
  return new Promise((res, rej) => {
    if ((email.trim().length || password.trim().length) != 0) {
      res();
    } else {
      rej();
    }
  });
}
