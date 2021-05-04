const express = require("express");
const router = express.Router();
const { Moviescontrollers } = require("./../controllers");
const { verifyTokenAccess } = require("./../helpers/VerifyToken");

const { AddSchedule } = Moviescontrollers;

router.patch("/set/:id", verifyTokenAccess, AddSchedule);

module.exports = router;
