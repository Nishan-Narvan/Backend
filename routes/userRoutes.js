const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getCurrentUser,
  } = require("../controllers/userController");
  

  const { protect } = require("../middleware/authMiddleware");

router.get("/current", protect, getCurrentUser);


 router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", getCurrentUser);


module.exports = router;
