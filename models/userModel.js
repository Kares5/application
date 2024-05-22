import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type : String , required : true , trim : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true },
    phone : {type : String , required : true },
    address : {type : String , required : true },
    // answer for forget password
    answer : {type : String , required : true },
    // 0 = not Admin ,, 1 = Admin
    role : {type : Number , default : 0}
}, {timestamps : true})

export default mongoose.model('User', userSchema)