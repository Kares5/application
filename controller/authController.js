import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import router from '../routes/authRoutes.js'
import orderModel from '../models/orderModel.js'

//  =============================== register  =============================================
export const registerController = async ( req , res) => {
    try {   
        // get data from user 
        const {name , email , password ,  phone ,  address , answer } = req.body
        // validate
        if(!name) {
            return res.send({message : 'Name is required'})
        }
        if(!email) {
            return res.send({message : 'Email is required'})
        }
        if(!password) {
            return res.send({message : 'Password is required'})
        }
        if(!phone) {
            return res.send({message : 'Phone is required'})
        }
        if(!address) {
            return res.send({message : 'Address is required'})
        }
        if(!answer) {
            return res.send({message : 'Answer is required'})
        }
        // check if user already registered based on finding email in db (because email is unique)
        // email from user and email from DB
        // findOne({email : email})
        const existingUser = await userModel.findOne({ email})
        // if exist user ==> return false and error message
        if (existingUser) {
          return  res.status(200).send({success : false, message : "User already registered Please Log In" })
        }
        // if user not existing in DB ==> hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)
        const newUser = await new userModel({name , email , password : hashedPassword , phone , address , answer}).save()
        res.status(201).send({success : true , message : 'User Registered successfully' , newUser})

    } catch (error) {
        console.log(error)
        // in fron   ==> if (res.data.success) for value of success vs (res.data.message) for value of message
        res.status(500).send({success : false, message : "Error in  registering" , error })
    }
}

// =================== ======= login =========================
export const loginController = async (req, res) => { 
    try {
        // get data from user
        const {email, password} = req.body 
        // validate
        if(!email || !password) {
            return  res.status(404).send({success : false, message : "invalid email or password"})  
        }
        // check user if not in db ==> should  registered first
        const existingUser = await userModel.findOne({ email})
        if(!existingUser) {
            return  res.status(404).send({success : false, message : "user not registered"})              
        }
        // if user in db check if password is valid
        //  existingUser.password == password in db
        // password = password from user
        const passwordIsValid = await bcrypt.compare(password , existingUser.password) 
        if(!passwordIsValid) {
            return res.status(200).send({success : false, message : "password is Invalid"})
        }
        // if password is valid
        // generate token
        const token = await JWT.sign({_id : existingUser._id} , process.env.JWT_SECRET , {expiresIn : "7d"})
        res.status(200).send({success : true , message : 'User login successfully' , existingUser : {
            _id : existingUser._id ,
            name : existingUser.name ,
            email : existingUser.email ,
            phone : existingUser.phone ,
            address : existingUser.address ,
            role : existingUser.role
        } , token})
        // data in frontend = success , message , existingUser , token
    } catch (error) {
        console.log(error)
        res.status(500).send({success : false, message : "Error in  Login" , error })
    }
}
// =================== ======= Forgot Password =========================

export const forgotPasswordController = async(req , res) => {
    try {
        // get data from user
        const {email , answer , newPassword } = req.body
        // validate
        if(!email) {
            res.status(400).send({message : "Email is required"})
        }
        if(!answer) {
            res.status(400).send({message : "Answer is required"})
        }
        if(!newPassword) {
            res.status(400).send({message : "New Password is required"})
        }
        // check email and answer in db
        const existingUser = await userModel.findOne({ email , answer})
        if(!existingUser) {
            res.status(404).send({success : false , message : "Email or answer is not valid"})
        }
        // if the email and answer are valid then hash new password
        const salt = await bcrypt.genSalt(10)
        const hashedNewPassword = await bcrypt.hash(newPassword , salt)
        // update the password in DB
        await userModel.findByIdAndUpdate(existingUser._id , {password :hashedNewPassword })
        res.status(200).send({success : true , message : "Password updated successfully "})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({success : false, message : "Error in  forgot-Password" , error })
    }
}
// =================== ======= test protected rotes=========================
export const testController = async (req, res) => {
    try {
        res.send("Protectd Routes")
    } catch (error) {
        console.log(error)
    }
}
// =================== ======= update current user profile =========================

export const updateUserProfileController = async (req, res) => {
    try {
        // get data from user 
        const {name ,email , phone , address , password } = req.body
        // find the user by id
        const user = await userModel.findById(req.user._id)
        // the const user now contains all fields
        // password
            const salt = await bcrypt.genSalt(10)
            const hashedNewPassword = await bcrypt.hash(password , salt)
            user.password = hashedNewPassword

            const updateUser = await userModel.findByIdAndUpdate(req.user._id , {
              name: name || user.name,
              email : email || user.email ,
              password: hashedNewPassword || user.password,
              phone : phone || user.phone ,
              address: address || user.address
            }, {new : true})
            res.status(200).send({
                success: true,
                message : "Profile updated successfully",
                updateUser
             }) 
        }catch (error) {
        console.log(error)
        res.status(400).send({success : false, message : "error in update profile" , error })
    }
}
// =================== ======= get all users  =========================
export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.send({success: true , message : "Get all users successfully" , users})
    } catch (error) {
        console.log(error)
        res.status(400).send({success : false, message : "error in  getting all users" , error })
    }
}
// =================== ======= delete  user   =========================
export const deleteUserController = async(req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        if (user) {
            await userModel.deleteOne({_id : user._id})
            res.send({success: true , message : "Delete user successfully" })
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({success : false, message : "User not found" , error })
    }
}
// =================== ======orders   =========================
export const getOrdersController = async (req, res) => {
    try {
          // كوني كتبت بريفرانس الباير انو المودل تبع اليوزرز يعني هيك صار فيني اخد اي اشي من المودل تبع اليوزر ومنها النيم 
        //   ونفس الشي البرودكتس تبع المودلصار فيني اخد منها الفوتو
        const orders = await orderModel.find({buyer : req.user._id}).populate('products' , '-photo').populate('buyer' , "name")
        res.json(orders)        
    } catch (error) {
        console.log(error)
        res.status(500).send({success : false, message : "Error while getting orders" , error })  
    }
}
// all orders

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('products', "-photo").populate("buyer" , "name").sort({ createdAt: -1});
        res.json(orders)       
    } catch (error) {
        console.log(error);
        res.status(500).send({success : false, message :" Error while getting all orders"} , error) 
    }
}

// update order status

export const OrderStatusController = async (req, res) => {
    try {
        const {orderId} = req.params
        const {status} =req.body
        const orders = await orderModel.findByIdAndUpdate(orderId , {status} , {new : true})
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({success : false, message :" Error while Updating  orders"} , error)
    }
}