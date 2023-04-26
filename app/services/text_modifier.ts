import words from "./bad_words.json";

var Filter = require("bad-words"),
  filter = new Filter({ placeHolder: "*" });

filter.addWords(...words.bad_words);

export function text_modifier(text: string) {
  return text.replace(" ", "_").replace(/[^a-zA-Z_0-9-]/g, "");
}

export function isProfane(word: string) {
  return filter.isProfane(word);
}

export function text_modifier_name(text: string) {
  return text.replace(/[^a-zA-Z-]/gi, "");
}

export function swear_cleaner(words: string): string {
  return filter.clean(words);
}

export function text_modifier_tags(text: string) {
  return text.replace(" ", "");
}
