const axios = require("axios");
const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/jsonplaceholder";

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  phone: String,
  website: String,
  address: Object,
  company: Object,
});

const User = mongoose.model("User", userSchema);

async function fetchAndStoreUsers() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected.");

    console.log("Fetching users from jsonplaceholder API...");
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
    );
    const users = response.data;

    console.log(`Fetched ${users.length} users. Saving to database...`);

    await User.deleteMany();
    await User.insertMany(users);

    console.log("Users saved successfully!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected.");
  }
}

fetchAndStoreUsers();
