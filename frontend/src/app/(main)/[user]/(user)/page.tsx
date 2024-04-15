import { Metadata } from "next";
import Tweets from "./_components/Tweets";

type Props = {
  params: { user: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = params.user;
  return {
    title: `${user} | Profile`,
  };
}

export default function UserPosts() {
  return (
    <div>
      <Tweets />
    </div>
  );
}
