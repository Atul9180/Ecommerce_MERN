import express from "express";
import {
  logincontroller,
  registerController,
  testController,
  forgotPasswordController,
  updateProfileController,
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

export default router;
