import express from 'express';
import { registerController , loginController , forgotPasswordController , testController , updateUserProfileController , getAllUsersController , deleteUserController, getOrdersController, getAllOrdersController, OrderStatusController}  from '../controller/authController.js';
import { requireSignIn , isAdmin } from '../middleware/authMiddleware.js';



const router = express.Router();

// Register method POST
router.post('/register' , registerController)

// LOGIN || MEthod POST
router.post('/login' , loginController)

//  Forgot password || MEthod POST
router.post('/forgot-password' , forgotPasswordController)

// test routes
router.get('/test' ,requireSignIn , isAdmin , testController )

// protected routes authenticate
router.get('/user-auth' , requireSignIn , (req , res) => {
    res.status(200).send({ok : true})
})

// protected routes Admin
router.get('/admin-auth' , requireSignIn , isAdmin , (req , res) => {
    res.status(200).send({ok : true})
})

// update user profile
router.put('/profile' , requireSignIn , updateUserProfileController)

// get All users 
router.get('/all-user' , requireSignIn , isAdmin , getAllUsersController)
// delete user by id
router.delete('/:id' , requireSignIn , isAdmin , deleteUserController)


// orders
router.get('/orders', requireSignIn , getOrdersController)
//All orders 
router.get('/all-orders' ,requireSignIn , isAdmin,getAllOrdersController )
// // order Update status
router.put('/order-status/:orderId' , requireSignIn , isAdmin , OrderStatusController)
export default router