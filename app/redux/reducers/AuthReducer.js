export function authReducer(state, action) {
  switch (action.type) {
    case "VERIFY_EMAIL":
      return {
        emailVerified: state.emailVerified,
      };
  }
}
