const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");

app.use(cors());
connectDB();

app.use(express.json({ extended: false }));
const PORT = 5152;

app.get("/", (req, res) => {
  res.send("API running");
});
app.use("/", require("./routes/pokemon"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
