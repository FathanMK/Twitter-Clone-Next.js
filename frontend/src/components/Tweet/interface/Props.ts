export interface Props {
  id: string;
  images: string[];
  createdAt: string;
  content: string;
  displayName: string;
  username: string;
  isParent?: boolean;
  totalReplies: number;
  likes: any[];
  profilePicture: string;
}
