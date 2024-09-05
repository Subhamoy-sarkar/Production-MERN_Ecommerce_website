import express from 'express';
import {isAdmin,requireSignIn} from './../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router=express.Router();

//routes

//create Route
router.post('/create-category',requireSignIn,isAdmin , createCategoryController);


//update Route
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

//get all category Route
router.get('/get-category',categoryController);

//single category Route
router.get('/single-category/:slug',singleCategoryController);

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);
export default router;