// export const emailValidator = (email) => {
//   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//   if (reg.test(text) === false) {
//     console.log("Email is Not Correct");
//     setValid({ ...valid, validEmail: true });
//     return false;
//   }
//   if (validator.isEmail(email)) {

//   } else {
//     setValid({ ...valid, validEmail: false });
//     setEmailError("Not an email!");
//   }
// };

export const checkPassword = (password, setValid, setPasswordError) => {
  if (password.length > 6) {
    setValid({ validPassword: true });
  } else {
    setValid({ validPassword: false });
    setPasswordError("Password has to be atleast 6 symbols");
  }
};
