import express from "express";
import {
  logincontroller,
  registerController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getAllOrdersController,
  getOrdersController,
  setOrderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//@endpoint: /api/v1/auth/register
router.post("/register", registerController);

//@endpoint: /api/v1/auth/login
router.post("/login", logincontroller);

//@endpoint: /api/v1/auth/forgot-password
router.post("/forgot-password", forgotPasswordController);

//@desc: protected route auth: for user
//@endpoint: /api/v1/auth/user-auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//@desc: protected route auth: for admin
//@endpoint: /api/v1/auth/admin-auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//@desc: protected route test:
//@endpoint: /api/v1/auth/test
router.get("/test", requireSignIn, isAdmin, testController);
// router.get('/test', testController);

//@desc: update profile
//@endpoint: /api/v1/auth/profile
router.put("/profile", requireSignIn, updateProfileController);

//@desc:Users get All orders
//@endpoint: /api/v1/auth/orders
router.get("/orders", requireSignIn, getOrdersController);

//@desc:Admin get All orders
//@endpoint: /api/v1/auth/all-orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//@desc:Admin update Order Shipping status
//@endpoint: /api/v1/auth/order-status/:orderId
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  setOrderStatusController
);

export default router;
