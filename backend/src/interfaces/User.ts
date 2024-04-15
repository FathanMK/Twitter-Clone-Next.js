export interface User {
  id?: string;
  displayName: string;
  username: string;
  email: string;
  password?: string;
  profilePicture?: string;
  bannerPicture?: string;
}
