const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  const token = req.header("Authorization");
  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({
      message: "No Token"
    });
  }

  try {

    const verified = jwt.verify(
      token,
      "mysecretkey"
    );

    req.user = verified;

    next();

  } catch (err) {

    res.status(401).json({
      message: "Invalid Token"
    });

  }
};

module.exports = authMiddleware;