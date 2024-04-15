import "dotenv/config";
import { NextFunction } from "express";
import { Request, Response } from "express";

import TweetServices from "../services/Tweet.services";

const DEV_URL = process.env.DEV_URL;

class TweetControllers {
  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.user;
      const files = req.files! as Array<Express.Multer.File>;
      const { content } = req.body;
      const images = files.map(
        (item) => `${DEV_URL}/uploads/${id}/tweets/${item.filename}`
      );

      await TweetServices.create({ userId: id, content, images });

      return res.status(200).json({ message: "Tweeted!" });
    } catch (error) {
      next(error);
    }
  }

  async createReply(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.user;
      const { tweetId } = req.params;
      const files = req.files! as Array<Express.Multer.File>;
      const { content } = req.body;
      const images = files.map(
        (item) => `${DEV_URL}/uploads/${id}/${item.filename}`
      );

      await TweetServices.createReply({ userId: id, tweetId, content, images });

      return res.status(200).json({ message: "Tweeted!" });
    } catch (error) {
      next(error);
    }
  }

  async createLike(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.user;
      const { tweetId } = req.params;

      await TweetServices.createLike(tweetId, id);

      return res.status(200).json({ message: "Liked!" });
    } catch (error) {
      next(error);
    }
  }

  async getAllTweet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.user;
      const tweets = await TweetServices.getAllTweet(id);

      return res.status(200).json({ tweets });
    } catch (error) {
      next(error);
    }
  }

  async getAllTweetByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { username } = req.params;
      const tweets = await TweetServices.getAllTweetByUsername(username);

      return res.status(200).json({ tweets });
    } catch (error) {
      next(error);
    }
  }

  async getAllReplies(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { username } = req.params;
      const replies = await TweetServices.getAllReplies(username);

      return res.status(200).json({ replies });
    } catch (error) {
      next(error);
    }
  }

  async getTweetById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { tweetId } = req.params;
      const tweet = await TweetServices.getTweetById(tweetId);

      return res.status(200).json({ tweet });
    } catch (error) {
      next(error);
    }
  }

  async deleteLike(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.user;
      const { tweetId } = req.params;

      await TweetServices.deleteLike(tweetId, id);

      return res.status(200).json({ message: "Unliked!" });
    } catch (error) {
      next(error);
    }
  }

  async searchContent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { q } = req.query;

      const results = await TweetServices.searchContent(q as string);

      return res.status(200).json({ results });
    } catch (error) {
      next(error);
    }
  }
}

export default new TweetControllers();
