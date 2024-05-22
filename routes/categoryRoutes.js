import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../controller/categoryController.js';

const router = express.Router();

// routes

// create 
router.post('/create-category', requireSignIn , isAdmin , createCategoryController);

// update 
router.put('/update-category/:id', requireSignIn , isAdmin , updateCategoryController);

// get all categories 
router.get('/get-category',  getCategoryController)
// delete category
router.delete('/delete-category/:id',  requireSignIn ,isAdmin, deleteCategoryController)

export default router