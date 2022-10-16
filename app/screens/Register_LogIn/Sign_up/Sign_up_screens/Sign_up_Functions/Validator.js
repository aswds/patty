export const emailValidator = (email) => {
  if (validator.isEmail(email)) {
    setValid({ ...valid, validEmail: true });
  } else {
    setValid({ ...valid, validEmail: false });
    setEmailError("Not an email!");
  }
};
export const checkPassword = (password, setValid, setPasswordError) => {
  if (password.length > 6) {
    setValid({ validPassword: true });
  } else {
    setValid({ validPassword: false });
    setPasswordError("Password has to be atleast 6 symbols");
  }
};
