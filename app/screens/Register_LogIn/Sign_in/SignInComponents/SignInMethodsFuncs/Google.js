import * as React from "react";



export function loginWithGoogle() {
  WebBrowser.maybeCompleteAuthSession();

  

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
