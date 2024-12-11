import Pagination from "@/app/components/Pagination";
import { render, screen } from "@testing-library/react";
import { usePathname, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Pagination", () => {
  // 各テストの前にモックをリセット
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: (param: string) => {
        if (param === "page") {
          return "1";
        }
        if (param === "perPage") {
          return "25";
        }
        return null;
      },
      toString: () => "page=1&perPage=25",
    }));
    (usePathname as jest.Mock).mockReturnValue("/test-path");
  });

  it("renders pagination when total items exceed default items per page", () => {
    render(<Pagination totalItems={50} defaultItemsPerPage={25} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does not render pagination when total items are less than default items per page", () => {
    render(<Pagination totalItems={20} defaultItemsPerPage={25} />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders previous and next buttons when not on first or last page", () => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: (param: string) => {
        if (param === "page") {
          return "2";
        }
        if (param === "perPage") {
          return "25";
        }
        return null;
      },
      toString: () => "page=2&perPage=25",
    }));

    render(<Pagination totalItems={75} defaultItemsPerPage={25} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("does not render previous button on first page", () => {
    render(<Pagination totalItems={50} defaultItemsPerPage={25} />);

    expect(screen.queryByText("Previous")).not.toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("does not render next button on last page", () => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: (param: string) => {
        if (param === "page") {
          return "2";
        }
        if (param === "perPage") {
          return "25";
        }
        return null;
      },
      toString: () => "page=2&perPage=25",
    }));

    render(<Pagination totalItems={50} defaultItemsPerPage={25} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });

  it("renders ellipsis when there are many pages", () => {
    render(<Pagination totalItems={250} defaultItemsPerPage={25} />);

    // スクリーンリーダー用のテキストを検索
    expect(screen.getAllByText("More pages")).toHaveLength(1);
  });

  it("correctly handles custom delta value", () => {
    render(<Pagination totalItems={250} defaultItemsPerPage={25} delta={1} />);

    // delta=1の場合、現在のページの前後1ページずつしか表示されない
    const pageNumbers = screen
      .getAllByRole("link")
      .map((link) => link.textContent);
    expect(pageNumbers).toEqual(expect.arrayContaining(["1", "2", "10"]));
  });
});
