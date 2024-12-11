"use client";

import { paginate } from "@/app/lib/paginate";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as _Pagination,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PaginationProps {
  totalItems: number;
  defaultItemsPerPage?: number;
  delta?: number;
}

export default function Pagination({
  totalItems,
  defaultItemsPerPage = 25,
  delta = 2,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number.parseInt(searchParams.get("page") ?? "1");
  const itemsPerPage = Number.parseInt(
    searchParams.get("perPage") ?? defaultItemsPerPage.toString()
  );

  const { pages, isFirstPage, isLastPage } = paginate({
    totalItems,
    itemsPerPage,
    currentPage,
    delta,
  });

  const createPageURL = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname]
  );

  if (totalItems <= defaultItemsPerPage) {
    return null;
  }

  return (
    <_Pagination className="mt-4">
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          </PaginationItem>
        )}

        {pages.map((page, _i) => (
          <PaginationItem key={page.value}>
            {page.type === "dots" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageURL(page.value)}
                isActive={page.value === currentPage}
              >
                {page.value}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {!isLastPage && (
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </_Pagination>
  );
}
