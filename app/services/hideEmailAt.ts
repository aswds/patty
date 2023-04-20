export function hideEmailBeforeAt(email: string): string {
  const emailLen = email.length;
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    // The email doesn't contain an @ sign.
    return email;
  } else {
    const firstLetters = email.slice(0, Math.floor(emailLen / 5));
    // Replace the characters before the @ sign with asterisks.
    const hiddenChars = "*".repeat(5);
    return firstLetters + hiddenChars + email.slice(atIndex);
  }
}
