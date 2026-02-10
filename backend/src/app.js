const express = require("express");
const cors = require("cors");

require("dotenv").config();

const certificateRoutes = require("./routes/certificateRoutes");
const verifyRoutes = require("./routes/verifyRoutes");
const revokeRoutes = require("./routes/revokeRoutes");

const adminRoutes = require("./routes/adminRoutes");

const instituteRoutes = require("./routes/instituteRoutes");
const instituteAuthRoutes = require("./routes/instituteAuthRoutes");

const studentRoutes = require("./routes/studentRoutes");
const studentAuthRoutes = require("./routes/studentAuthRoutes");
const studentDashboardRoutes = require("./routes/studentDashboardRoutes");
const publicVerifyRoutes = require("./routes/publicVerifyRoutes");
const instituteDashboardRoutes = require("./routes/instituteDashboardRoutes");

const verifyWithFileRoutes = require("./routes/verifyWithFileRoutes");

const connectDB = require("./config/db");
const blockchainRoutes = require("./routes/blockchainRoutes");




const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blockchain", blockchainRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/institute-auth", instituteAuthRoutes);

app.use("/api/students", studentRoutes);
app.use("/api/student-auth", studentAuthRoutes);
app.use("/api/student", studentDashboardRoutes);
app.use("/api/public/verify", publicVerifyRoutes);
app.use("/api/institute-dashboard", instituteDashboardRoutes);

app.use("/api/public", verifyWithFileRoutes);


connectDB();

// routes
app.use("/api/certificates", certificateRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/revoke", revokeRoutes);


// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
