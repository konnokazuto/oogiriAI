import getServerSession from "next-auth";
import { auth } from "@/auth";
import ClientMyPage from "../components/ClientMyPage";

export default async function MyPage() {
  const session = await auth();

  return <ClientMyPage session={session} />;
}
