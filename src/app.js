const express = require("express");
const app = express();
const bodyparser = require('body-parser')
const router = require("../routes/user"); 
const port = process.env.PORT || 3000;
const path = require('path');
const mongoconn = require("./db/conn");
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine", "ejs");

// Use the router
app.use('/', router);
console.log(mongoconn)
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
