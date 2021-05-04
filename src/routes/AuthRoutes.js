const express = require("express");
const router = express.Router();
const { Authcontrollers } = require("./../controllers");
const { verifyTokenAccess } = require("./../helpers/VerifyToken");

const { Login, deactive, closed, activate } = Authcontrollers;

router.post("/login", Login);
router.patch("/activate", verifyTokenAccess, activate);
router.patch("/deactive", verifyTokenAccess, deactive);
router.patch("/closed", verifyTokenAccess, closed);

module.exports = router;
