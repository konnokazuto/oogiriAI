interface PaginationOptions {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  delta?: number;
}

type PageItem =
  | {
      type: "number";
      value: number;
    }
  | {
      type: "dots";
      value?: undefined;
    };

interface PaginationResult {
  pages: PageItem[];
  isFirstPage: boolean;
  isLastPage: boolean;
}

export const paginate = (options: PaginationOptions): PaginationResult => {
  const { totalItems, itemsPerPage, currentPage, delta = 2 } = options;
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const pages: PageItem[] = [];
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(pageCount - 1, currentPage + delta);

  // ページ数が1つしかない場合
  if (pageCount <= 1) {
    return {
      pages: [{ type: "number", value: 1 }],
      isFirstPage: true,
      isLastPage: true,
    };
  }

  pages.push({ type: "number", value: 1 });

  if (rangeStart > 2) {
    pages.push({ type: "dots" });
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push({ type: "number", value: i });
  }

  if (rangeEnd < pageCount - 1) {
    pages.push({ type: "dots" });
  }

  pages.push({ type: "number", value: pageCount });

  return {
    pages,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === pageCount,
  };
};
