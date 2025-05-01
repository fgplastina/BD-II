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

async function showUsers() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected!");

    const users = await User.find();

    console.log(`👥 Found ${users.length} users:`);
    users.forEach((user) => {
      console.log(`- ${user.name} (${user.email})`);
    });
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
}

showUsers();

