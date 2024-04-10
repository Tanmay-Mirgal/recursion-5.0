const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser")
const nodemailer = require("nodemailer")

const userCollection = require("../models/userlogin")
let userlogged= false;
router.get("/", (req, res) => {
  res.render("login");
});
router.get("/home", (req, res) => {
  res.render("index");
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/cart", (req, res) => {
  res.render("cart");
});
router.get("/checkout", (req, res) => {
  res.render("checkout");
});
router.get("/popular", (req, res) => {
  res.render("popular");
});
router.get("/trending", (req, res) => {
  res.render("trending");
});
router.get("/shop", (req, res) => {
  res.render("shop");
});

router.get("/contact",(req,res)=>{
res.render("contactus")
})

router.get("/single",(req,res)=>{
res.render("singleblog")
})

router.get("/faq",(req,res)=>{
res.render("faq")
})
router.use(bodyparser.urlencoded({extended:true}))

router.get("/home", (req, res) => {
  try {
    if(userlogged === true){
      res.status(201).render("index")
    }
    else{
      res.send("Logged out ! Please login to access the Page")
    }
  } catch (e) {
    res.status(404).send(e)
  }
});
router.post("/signup",async (req,res)=>{
   const signup = {
    Name:req.body.Name,
    Password:req.body.Password,
    Email:req.body.Email,
    role:req.body.role,
}
const input = await userCollection.create(signup);
userlogged=true;
res.render("index")
})


router.post("/login",async(req,res)=>{
  try {
    const { Email, Password } = req.body;
    const check = await userCollection.findOne({ Email, Password });

    if (check !== null) {
      console.log("Logged in");
      userlogged = true;

      // Check if the user is an admin
      if (check._id.toString() === "65f26bad3735be024b4a6dae") {
        check.role = "admin"
        res.render("admin");
        
      } else {
        check.role = "user"
        res.render("index");
      }
    } else {
      res.status(400).send("Wrong details");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/contactus",(req,res)=>{
const data = [
  {
    name:req.body.name,
    email:req.body.email,
    subject:req.body.subject,
    textarea:req.body.message
  }

]
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    username:"adityashah2701@gmail.com",
    password:"yhah yrqo gxhi dmyn"
  }
})
var mailOptions = {
  from:"adityashah2701@gmail.com",
  to:req.body.email,
  cc:"adityashah2701@gmail.com",
  subject:"Thanks for your feedback" + data.name,
  text:"Thanks for your kind response" + data.message
}
transporter.sendMail(mailOptions,(err,data)=>{
  if(err){
    console.log("error is "+err)
  }
  else{
    alert("Mail Successfully Sent"+data.response)
  }
})
})
router.get("*", (req, res) => {
  res.status(404).render("error")
});

module.exports = router;
