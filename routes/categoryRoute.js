import express  from "express";
const router= express.Router();
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController,getSingleCategoryController,deleteCategoryController,getAllCategoryController,updateCategoryController } from "../controllers/categoryController.js";


//@desc: create Category
//@endpoint: /api/v1/category/create-category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);


//@desc: getAll Category
//@endpoint: /api/v1/category/getAllCategory
router.get('/getAllCategory',getAllCategoryController);


//@desc: get single Category
//@endpoint: /api/v1/category/single-category/:id
router.get('/single-category/:slug',getSingleCategoryController);


//@desc: update Category
//@endpoint: /api/v1/category/update-category/:id
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);


//@desc: delete Category
//@endpoint: /api/v1/category/delete-category/:id
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);

export default router;