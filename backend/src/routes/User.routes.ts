import { Router } from "express";
import multer from "multer";
import fs from "fs";

import UserControllers from "../controllers/User.controllers";
import authToken from "../middlewares/auth-token";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const path = `./public/uploads/profile`;
    fs.mkdirSync(path, { recursive: true });
    callback(null, path);
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const User = Router();
const upload = multer({ storage });

User.post("/user/register", upload.array("images", 2), UserControllers.create);
User.post("/user/login", UserControllers.login);

User.post("/user/verify-token", authToken, UserControllers.verifyToken);

User.get("/:username/likes/", authToken, UserControllers.getAllLikes);

User.get("/user", authToken, UserControllers.searchUserByUsername);
User.get("/user/:username", authToken, UserControllers.getUserByUsername);
User.get("/:username/followers", authToken, UserControllers.getAllFollowers);
User.get("/:username/followings", authToken, UserControllers.getAllFollowings);

User.get("/recUsers", authToken, UserControllers.getSomeUsers);

User.post("/user/follow/:username", authToken, UserControllers.followedUser);
User.post(
  "/user/unfollow/:username",
  authToken,
  UserControllers.unfollowedUser
);

export default User;
