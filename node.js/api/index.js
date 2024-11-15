const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.post("/test", (req, res) => {
  res.send("Test page");
});

app.put("/test", (req, res) => {
  res.send("Test page");
});

app.patch("/test", (req, res) => {
  res.send("Test page");
});

app.delete("/test", (req, res) => {
  res.send("Test page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
