//1) import monogoose
const mongoose = require('mongoose')

//2, crete schema
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String,
         default: '' 
    },
    linkedin:{
        type:String,
        default: '' 
    },
    profile:{
        type:String,
        default: '' 
       
    }

})

//3) crete Model
//mongoose.model() method is used to crete model,it accepts two arguments
// 1) name of the collection that needs to map with this model
//2) the scheme creted
const users=mongoose.model("users",userSchema)

//4) export the modal
module.exports=users;

