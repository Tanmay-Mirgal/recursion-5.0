const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

Name : {
    type:String,
    required:true,
    minimum:3,
    maximum:30
},
Email :{
type:String,
required:true,

},
Password : {
    type : String,
    required:true,
    minimum:7,
    maximum:15
},
role:{
    type:String,
    
}
})
const userCollection = new mongoose.model("user",userSchema)

module.exports = userCollection;