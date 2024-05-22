import mongoose  from "mongoose";

const orderSchema = new mongoose.Schema({
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Products'
    }],
    buyer : {
        type : mongoose.Schema.Types.ObjectId,   
        ref : 'User'
    },
    status : {
        type : String,
        default : 'Not Process',
        enum : ['Not Process' ,  "Payed" , "Delivered" , "Cancelled"]
    }
}, {timestamps : true});

export default mongoose.model('Order', orderSchema)