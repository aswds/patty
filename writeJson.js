const fs = require("fs");

// Read the contents of the text file
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the text into an array of words
  const words = data.split("\n");

  // Create an array of objects from the words

  // Convert the array of objects into a JSON string
  const jsonString = JSON.stringify(words, null, 2);

  // Write the JSON string to a file
  fs.writeFile("data.json", jsonString, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
});
