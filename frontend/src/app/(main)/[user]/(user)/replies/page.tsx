import { Metadata } from "next";
import Replies from "./_components/Replies";

type Props = {
  params: { user: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = params.user;
  return {
    title: `${user} | Replies`,
  };
}

export default function UserReplies() {
  return (
    <div>
      <Replies />
    </div>
  );
}
