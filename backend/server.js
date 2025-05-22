const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongo connected !"))
  .catch(err => console.log(err));

// Mongoose schema & model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/testpost", (req, res) => {
  res.status(200).send("Test POST endpoint reached!");
});

// Test MongoDB connection
app.get("/test-mongo", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send("MongoDB connection successful!");
  } catch (err) {
    res.status(500).send("MongoDB connection failed.");
  }
});

// Register user
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).send("User already exists");
    const newUser = new User({ username, password });
    await newUser.save();
    res.send("User registered successfully!");
  } catch (err) {
    res.status(500).send("Error registering user.");
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("user : " + username);
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).send("Invalid credentials");
    res.send("Login successful!");
  } catch (err) {
    res.status(500).send("Error logging in.");
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
