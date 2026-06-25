const roleMiddleware = (role) => {

  return (req, res, next) => {

    console.log("Token Role:", req.user.role);
    console.log("Required Role:", role);

    if (req.user.role !== role) {
      return res.status(403).json({
        message: "Access Denied"
      });
    }

    next();
  };

};

module.exports = roleMiddleware;