export function error_handle(error_type, message, additionalFuncs) {
  const { setValid, valid } = additionalFuncs;
  console.log(error_type, message);
  return new Promise((res, rej) => {
    switch (error_type) {
      case "email":
        setValid({ ...valid, validEmail: false });
        rej(message);
        break;
      case "password":
        setValid({ ...valid, validPassword: false });
        rej(message);
        break;
      case "unknown":
        setValid({ ...valid, validPassword: false, validEmail: false });
        rej(message);
        break;
      default:
        return;
    }
  });
}
