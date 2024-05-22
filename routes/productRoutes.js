import express from 'express';
import { isAdmin , requireSignIn} from './../middleware/authMiddleware.js'
import formidable from 'express-formidable'
import { createOrderController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController,  relatedProductController,  updateProductController } from '../controller/productController.js';
const router = express.Router()

// routes 
// create product
router.post('/create-product', requireSignIn , isAdmin , formidable() , createProductController)

// get all
router.get('/get-product', getProductController)

// get single product
// slug from product
router.get('/get-product/:slug', getSingleProductController)

// get photo
router.get('/product-photo/:pid' , productPhotoController)

// update product
router.put('/update-product/:pid' , requireSignIn , isAdmin , formidable() , updateProductController)

// delete product
router.delete('/delete-product/:pid' , requireSignIn , isAdmin , deleteProductController)

// filter 
router.post('/product-filter' , productFilterController)

// product count
// انتبهي من اي فراغ بالرابط
router.get('/product-count' , productCountController)

// product List based on page
router.get('/product-list/:page' , productListController)

// similar products
router.get('/related-product/:pid/:cid' , relatedProductController)

// products in category
router.get('/product-category/:slug' , productCategoryController)

// create a new order
router.post('/create-order' , requireSignIn , createOrderController)
export default router