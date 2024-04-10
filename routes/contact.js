const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser")
const nodemailer = require("nodemailer")

router.get("/contact",(req,res)=>{
    res.render("contact")
})