export function text_modifier(text) {
  return text.replace(" ", "_").replace(/[^a-zA-Z_0-9-]/g, "");
}
