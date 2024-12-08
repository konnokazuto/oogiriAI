import { paginate } from "@/app/lib/paginate";

describe("paginate function", () => {
  describe("single page case", () => {
    it("should handle single page correctly", () => {
      const result = paginate({
        totalItems: 5,
        itemsPerPage: 10,
        currentPage: 1,
      });

      expect(result.pages).toEqual([{ type: "number", value: 1 }]);
      expect(result.isFirstPage).toBe(true);
      expect(result.isLastPage).toBe(true);
    });
  });

  describe("multiple pages cases", () => {
    it("should handle few pages without dots", () => {
      const result = paginate({
        totalItems: 25,
        itemsPerPage: 10,
        currentPage: 2,
        delta: 2,
      });

      expect(result.pages).toEqual([
        { type: "number", value: 1 },
        { type: "number", value: 2 },
        { type: "number", value: 3 },
      ]);
      expect(result.isFirstPage).toBe(false);
      expect(result.isLastPage).toBe(false);
    });

    it("should handle middle page with dots on both sides", () => {
      const result = paginate({
        totalItems: 100,
        itemsPerPage: 10,
        currentPage: 5,
        delta: 2,
      });

      expect(result.pages).toEqual([
        { type: "number", value: 1 },
        { type: "dots" },
        { type: "number", value: 3 },
        { type: "number", value: 4 },
        { type: "number", value: 5 },
        { type: "number", value: 6 },
        { type: "number", value: 7 },
        { type: "dots" },
        { type: "number", value: 10 },
      ]);
    });

    it("should handle first page range", () => {
      const result = paginate({
        totalItems: 100,
        itemsPerPage: 10,
        currentPage: 1,
        delta: 2,
      });

      expect(result.pages).toEqual([
        { type: "number", value: 1 },
        { type: "number", value: 2 },
        { type: "number", value: 3 },
        { type: "dots" },
        { type: "number", value: 10 },
      ]);
      expect(result.isFirstPage).toBe(true);
      expect(result.isLastPage).toBe(false);
    });

    it("should handle last page range", () => {
      const result = paginate({
        totalItems: 100,
        itemsPerPage: 10,
        currentPage: 10,
        delta: 2,
      });

      expect(result.pages).toEqual([
        { type: "number", value: 1 },
        { type: "dots" },
        { type: "number", value: 8 },
        { type: "number", value: 9 },
        { type: "number", value: 10 },
      ]);
      expect(result.isFirstPage).toBe(false);
      expect(result.isLastPage).toBe(true);
    });
  });
});
