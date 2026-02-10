const jwt = require("jsonwebtoken");

const authenticateInstitute = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token missing"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "INSTITUTE") {
      return res.status(403).json({
        message: "Access denied: Institute only"
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};


module.exports = { authenticateInstitute };
