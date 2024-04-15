import { Router } from "express";
import fs from "fs";

import TweetControllers from "../controllers/Tweet.controllers";
import authToken from "../middlewares/auth-token";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const { id } = req.user;
    const path = `./public/uploads/tweets/${id}`;
    fs.mkdirSync(path, { recursive: true });
    callback(null, path);
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}-tweet-${file.originalname}`);
  },
});

const Tweet = Router();
const upload = multer({ storage });

Tweet.post(
  "/tweet",
  authToken,
  upload.array("images", 4),
  TweetControllers.create
);
Tweet.get("/tweets", authToken, TweetControllers.getAllTweet);
Tweet.get(
  "/tweets/:username",
  authToken,
  TweetControllers.getAllTweetByUsername
);
Tweet.get("/tweet/:tweetId", authToken, TweetControllers.getTweetById);

Tweet.get("/replies/:username", authToken, TweetControllers.getAllReplies);
Tweet.post(
  "/reply/:tweetId",
  authToken,
  upload.array("images", 4),
  TweetControllers.createReply
);

Tweet.post("/like/:tweetId", authToken, TweetControllers.createLike);
Tweet.delete("/like/:tweetId", authToken, TweetControllers.deleteLike);

Tweet.get("/search", authToken, TweetControllers.searchContent);

export default Tweet;
