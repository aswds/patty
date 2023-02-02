export function authReducer(state, action) {
  console.log(state);
  switch (action.type) {
    case "VERIFY_EMAIL":
      return {
        emailVerified: state.emailVerified,
      };
  }
}
