export function text_modifier(text) {
  return text.replace(" ", "_").replace(/[^a-zA-Z_0-9-]/g, "");
}

export function text_modifier_name(text) {
  return text.replace(/[^a-zA-Z-]/gi, "");
}

export function text_modifier_tags(text) {
  return text.replace(" ", "");
}
