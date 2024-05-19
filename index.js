const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

const port = 8000;
const uploadImageRouter = require("./routes/uploadImage");

app.use(cors());

app.get("/api/home", async (req, res) => {
  res.json("Hello world!");
});

app.use('/upload-image', uploadImageRouter);

app.listen(port, () => {
  console.log("App listening on port", port);
});