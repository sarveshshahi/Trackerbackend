import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/user.auth.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxcount: 1,
    },
  ]),

  registerUser
);

router.route("/login").post(loginUser)

//secured route
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh_token").post(refreshAccessToken)
export default router;
