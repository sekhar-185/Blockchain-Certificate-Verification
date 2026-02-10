const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

const Admin = require("./src/models/Admin");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

(async () => {
  try {
    await connectDB();

    const existing = await Admin.findOne({ email: "admin@gmail.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hash = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@gmail.com",
      passwordHash: hash
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
