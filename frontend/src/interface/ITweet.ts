export interface ITweet {
  id: string;
  content: string;
  images: string[];
  likes: any[];
  replies: any[];
  retweet: any[];
  createdAt: string;
  user: {
    username: string;
    displayName: string;
    profilePicture: string;
  };
}
