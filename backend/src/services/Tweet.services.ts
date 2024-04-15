import { PrismaClient } from "@prisma/client";
import type { Tweet } from "../interfaces/Tweet";

const extendedPrismaClient = new PrismaClient().$extends({});

class TweetServices {
  private prisma: typeof extendedPrismaClient;

  constructor() {
    this.prisma = new PrismaClient().$extends({
      result: {
        user: {
          password: {
            needs: { password: true },
            compute() {
              return undefined;
            },
          },
        },
      },
    });
  }

  async create(params: Tweet): Promise<any> {
    const { userId, content, images } = params;
    try {
      const tweet = await this.prisma.tweet.create({
        data: {
          userId,
          content,
          images,
        },
      });

      return tweet;
    } catch (error) {
      throw error;
    }
  }

  async createReply(params: Tweet): Promise<any> {
    const { userId, tweetId, content, images } = params;
    try {
      const tweet = await this.prisma.tweet.update({
        where: {
          id: tweetId,
        },
        data: {
          replies: {
            create: [
              {
                userId,
                content,
                images,
              },
            ],
          },
        },
      });

      return tweet;
    } catch (error) {
      throw error;
    }
  }

  async createLike(tweetId: string, userId: string): Promise<any> {
    try {
      await this.prisma.tweet.update({
        where: { id: tweetId },
        include: {
          likes: true,
        },
        data: {
          likes: {
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

  async getAllTweet(id: string): Promise<any> {
    try {
      const followings = await this.prisma.user.findFirst({
        where: {
          id,
        },
        include: {
          followings: {
            include: {
              tweets: true,
            },
          },
        },
      });

      const followingUsernames = followings?.followings.map(
        (item) => item.username
      );
      //@ts-ignore
      const usernames = [followings?.username, ...followingUsernames];

      const tweets = await this.prisma.tweet.findMany({
        include: {
          user: true,
          replies: true,
          likes: true,
        },
        where: {
          AND: [
            {
              user: {
                username: { in: usernames },
              },
            },
            {
              replyId: null,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return tweets;
    } catch (error) {
      throw error;
    }
  }

  async getAllTweetByUsername(username: string): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        include: {
          tweets: {
            include: {
              user: true,
              replies: true,
              likes: true,
            },
          },
        },
        where: {
          username,
        },
      });

      return user?.tweets;
    } catch (error) {
      throw error;
    }
  }

  async getAllReplies(username: string): Promise<any> {
    try {
      const tweets = await this.prisma.tweet.findMany({
        include: {
          user: true,
          replies: {
            include: {
              user: true,
              replies: true,
              likes: true,
            },
          },
          likes: true,
        },
        where: {
          replies: {
            some: {
              user: {
                username,
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return tweets;
    } catch (error) {
      throw error;
    }
  }

  async getTweetById(id: string): Promise<any> {
    try {
      const tweet = await this.prisma.tweet.findFirst({
        include: {
          user: true,
          replies: {
            include: {
              user: true,
              likes: true,
              replies: true,
            },
          },
          likes: true,
        },
        where: {
          id,
        },
      });

      return tweet;
    } catch (error) {
      throw error;
    }
  }

  async deleteLike(tweetId: string, userId: string): Promise<any> {
    try {
      await this.prisma.tweet.update({
        where: { id: tweetId },
        include: {
          likes: true,
        },
        data: {
          likes: {
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

  async searchContent(query: string): Promise<any> {
    try {
      const results = await this.prisma.tweet.findMany({
        where: {
          content: {
            contains: query,
            mode: "insensitive",
          },
        },
        include: {
          user: true,
          replies: true,
          likes: true,
        },
      });

      return results;
    } catch (error) {
      throw error;
    }
  }
}

export default new TweetServices();
