const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("poll jenkins Webhook 🚀");
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
