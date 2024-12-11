import { fetchResponses } from "@/app/actions/responses";
import ClientMyPage from "@/app/components/ClientMyPage";
import Loading from "@/app/components/Loading";
import { auth } from "@/auth";
import { Suspense } from "react";

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
