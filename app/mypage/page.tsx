import { Suspense } from "react";
import { auth } from "@/auth";
import ClientMyPage from "@/app/components/ClientMyPage";
import { fetchResponses } from "@/app/actions/responses";
import Loading from "@/app/components/Loading";

export default async function MyPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await auth();
  const currentPage = Number(searchParams.page) || 1;

  if (!session) {
    redirect("/login");
  }

  const data = await fetchResponses(currentPage);

  return (
    <Suspense fallback={<Loading />}>
      <ClientMyPage initialData={data} session={session} />
    </Suspense>
  );
}
