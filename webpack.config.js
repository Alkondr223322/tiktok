const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./generateField.js", "./index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
};
