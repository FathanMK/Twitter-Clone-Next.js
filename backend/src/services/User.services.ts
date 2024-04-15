import "dotenv/config";
import type { User } from "../interfaces/User";

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserServices {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: User): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(data.password!, 10);
      await this.prisma.user.create({
        data: {
          displayName: data.displayName,
          username: data.username,
          email: data.email,
          password: hashedPassword!,
          profilePicture: data.profilePicture!,
          bannerPicture: data.bannerPicture!,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async checkUser(email: string, username: string) {
    try {
      const existedUserByEmail = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (existedUserByEmail) {
        throw { statusCode: 409, message: "User is already exist!" };
      }

      const existedUserByUsername = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (existedUserByUsername) {
        throw { statusCode: 409, message: "User is already exist!" };
      }
    } catch (error) {
      throw error;
    }
  }

  async login(data: User): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });
      if (!user) {
        throw { statusCode: 404, message: "Invalid username or password!" };
      }

      const isValidPassword = await bcrypt.compare(
        data.password!,
        user.password!
      );
      if (!isValidPassword) {
        throw { statusCode: 404, message: "Invalid username or password!" };
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      return {
        token,
        id: user.id,
        username: data.username,
        profilePicture: user.profilePicture,
      };
    } catch (error) {
      throw error;
    }
  }

  async searchUserByUsername(query: string): Promise<any> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          OR: [
            {
              displayName: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      });

      const filteredUser = users.map((item) => {
        const newObj = { ...item };
        delete (newObj as any).password;
        return newObj;
      });

      return filteredUser;
    } catch (error) {
      throw error;
    }
  }

  async getAllLikes(username: string): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username,
        },
        include: {
          likes: {
            include: {
              user: true,
              replies: true,
              likes: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsername(username: string, id: string): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username,
        },
        include: {
          followers: true,
          followings: true,
          tweets: true,
        },
      });

      if (!user) {
        return null;
      }

      delete (user as any).password;

      if (id === user.id) {
        return { user, isUser: true };
      }

      return { user, isUser: false };
    } catch (error) {
      throw error;
    }
  }

  async getAllFollowers(username: string): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username,
        },
        include: {
          followers: true,
        },
      });

      if (!user) {
        return null;
      }

      const filteredUser = user.followers.map((item) => {
        const newObj = { ...item };
        delete (newObj as any).password;
        return newObj;
      });

      return filteredUser;
    } catch (error) {
      throw error;
    }
  }

  async getAllFollowings(username: string): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username,
        },
        include: {
          followings: true,
        },
      });

      if (!user) {
        return null;
      }

      const filteredUser = user.followings.map((item) => {
        const newObj = { ...item };
        delete (newObj as any).password;
        return newObj;
      });

      return filteredUser;
    } catch (error) {
      throw error;
    }
  }

  async getSomeUsers(): Promise<any> {
    try {
      const users = await this.prisma.user.findMany({
        take: 5,
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async followedUser(userId: string, username: string): Promise<any> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        include: {
          followings: true,
        },
        data: {
          followings: {
            connect: {
              username,
            },
          },
        },
      });
      await this.prisma.user.update({
        where: {
          username,
        },
        include: {
          followers: true,
        },
        data: {
          followers: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async unfollowedUser(userId: string, username: string): Promise<any> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        include: {
          followings: true,
        },
        data: {
          followings: {
            disconnect: {
              username,
            },
          },
        },
      });
      await this.prisma.user.update({
        where: {
          username,
        },
        include: {
          followers: true,
        },
        data: {
          followers: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new UserServices();
