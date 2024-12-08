"use client";

import {
  Pagination as _Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { paginate } from "@/app/lib/paginate";

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

  const currentPage = parseInt(searchParams.get("page") ?? "1");
  const itemsPerPage = parseInt(
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

  if (totalItems <= defaultItemsPerPage) return null;

  return (
    <_Pagination className="mt-4">
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          </PaginationItem>
        )}

        {pages.map((page, i) => (
          <PaginationItem key={i}>
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
