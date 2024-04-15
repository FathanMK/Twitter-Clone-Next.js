import { Metadata } from "next";
import Likes from "./_components/Likes";

type Props = {
  params: { user: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = params.user;
  return {
    title: `${user} | Likes`,
  };
}

export default function UserLikes() {
  return (
    <div>
      <Likes />
    </div>
  );
}
