import { NextFunction, Request, Response } from "express";
import UserServices from "../services/User.services";

const DEV_URL = process.env.DEV_URL;

class UserControllers {
  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const files = req.files! as Array<Express.Multer.File>;
      const { filename: profilePic } =
        files.find((item) => item.originalname.includes("profilePic")) || {};
      const { filename: bannerPic } =
        files.find((item) => item.originalname.includes("bannerPic")) || {};

      const user = {
        displayName: req.body.displayName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: `${DEV_URL}/uploads/profile/${profilePic}`,
        bannerPicture: `${DEV_URL}/uploads/profile/${bannerPic}`,
      };

      await UserServices.checkUser(req.body.email, req.body.username);
      await UserServices.create(user);
      return res.status(200).json({ message: "User is created!" });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const credentials = req.body;
      const user = await UserServices.login(credentials);

      return res.status(200).json({
        message: "User is logged in!",
        ...user,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = req.user;

      if (user) {
        return res.status(200).json({ message: "Valid!" });
      } else {
        return res.status(403).json({ message: "Forbidden!" });
      }
    } catch (error) {
      next(error);
    }
  }

  async searchUserByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { u } = req.query;
      const users = await UserServices.searchUserByUsername(u as string);

      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  async getAllFollowers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { username } = req.params;
      const followers = await UserServices.getAllFollowers(username);

      return res.status(200).json({ followers });
    } catch (error) {
      next(error);
    }
  }

  async getAllFollowings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { username } = req.params;
      const followings = await UserServices.getAllFollowings(username);

      return res.status(200).json({ followings });
    } catch (error) {
      next(error);
    }
  }

  async getAllLikes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { username } = req.params;
      const user = await UserServices.getAllLikes(username);

      return res.status(200).json({ likes: user.likes });
    } catch (error) {
      next(error);
    }
  }

  async getUserByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.user;
      const { username } = req.params;
      const user = await UserServices.getUserByUsername(username, id);

      return res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  async getSomeUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const users = await UserServices.getSomeUsers();

      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  async followedUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.user;
      const { username } = req.params;

      await UserServices.followedUser(id, username);

      return res.status(200).json({ message: "Followed" });
    } catch (error) {
      next(error);
    }
  }

  async unfollowedUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.user;
      const { username } = req.params;

      await UserServices.unfollowedUser(id, username);

      return res.status(200).json({ message: "Unfollowed" });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserControllers();
