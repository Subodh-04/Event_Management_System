const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
  description: String,
  image: String
});
const Event = mongoose.model("Event", EventSchema);

app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.listen(5000, () => console.log("Server running on port 5000"));
