import express from "express";
import {
  createProductController,
  getProductController,
  updateProductController,
  productPhotoController,
  getProductByIdController,
  deleteProductController,
  productFilterController,
  productCountController,
  productListController,
  productSearchController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";



const router = express.Router();


//@desc: creating product route
//@endPoint: /api/v1/products/create-product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);


//@desc: getAll products
//@endpoint: /api/v1/products/get-product
router.get("/get-product", getProductController);


//@desc: get product By Id
//@endpoint: /api/v1/products/get-product/:slug
router.get("/get-product/:slug", getProductByIdController);


//@desc: deleting product route
//@endPoint: /api/v1/products/product/:pid
router.delete("/product/:pid", requireSignIn, isAdmin, deleteProductController);


//@desc: get product Photo By PId
//@endpoint: /api/v1/products/product-photo/:pid
router.get("/product-photo/:pid", productPhotoController);


//@desc: updating product route
//@endPoint: /api/v1/products/update-product/:pid
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);


//@desc: filter product by Category:
//@endpoint: /api/v1/products/product-filters
router.post("/product-filters/", productFilterController);


//@desc: product count
//@endpoint: /api/v1/products/product-count
router.get("/product-count", productCountController);


//@desc: product per page
//@endpoint: /api/v1/products/product-list/:page
router.get("/product-list/:page", productListController);


//@desc: search product 
//@endpoint: /api/v1/products/search-product/:keyword
router.get("/search-product/:keyword", productSearchController);


export default router;
