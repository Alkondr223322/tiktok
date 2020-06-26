const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/generateField.js", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
};
