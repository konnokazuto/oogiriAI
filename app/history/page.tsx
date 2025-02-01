import { History } from "@/app/components/History";
import { auth } from "@/auth";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import { redirect } from "next/navigation";
import { fetchResponses } from "@/app/actions/responses";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await auth();
  const currentPage = Number(searchParams.page) || 1;

  if (!session) {
    redirect("/auth/signin");
  }

  const data = await fetchResponses(currentPage);
  console.log(data);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <History initialData={data} session={session} />
      </Suspense>
    </div>
  );
}
