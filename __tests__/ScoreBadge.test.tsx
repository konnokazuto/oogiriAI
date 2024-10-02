import { render, screen } from "@testing-library/react";
import ScoreBadge from "@/app/components/ScoreBadge";
import { describe } from "node:test";
import "@testing-library/jest-dom";

describe("ScoreBadge", () => {
  it("displays the correct score", () => {
    render(<ScoreBadge score={90} />);
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("SCORE")).toBeInTheDocument();
    expect(screen.getByText("点")).toBeInTheDocument();
  });

  it("has gold style for scores 90 and above", () => {
    const { container } = render(<ScoreBadge score={95} />);
    expect(container.firstChild).toHaveClass("text-yellow-500");
    expect(container.firstChild).toHaveClass("glow-strong-yellow");
  });

  it("has silver style for scores between 70 and 89", () => {
    const { container } = render(<ScoreBadge score={80} />);
    expect(container.firstChild).toHaveClass("text-gray-700");
    expect(container.firstChild).toHaveClass("glow-strong-gray");
  });

  it("has bronze style for scores below 70", () => {
    const { container } = render(<ScoreBadge score={60} />);
    expect(container.firstChild).toHaveClass("text-red-600");
    expect(container.firstChild).toHaveClass("glow-strong-red");
  });

  it("has correct positioning classes", () => {
    const { container } = render(<ScoreBadge score={75} />);
    expect(container.firstChild).toHaveClass("absolute");
    expect(container.firstChild).toHaveClass("-top-6");
    expect(container.firstChild).toHaveClass("left-1/2");
    expect(container.firstChild).toHaveClass("transform");
    expect(container.firstChild).toHaveClass("-translate-x-1/2");
  });

  it("has correct layout classes", () => {
    const { container } = render(<ScoreBadge score={75} />);
    expect(container.firstChild).toHaveClass("flex");
    expect(container.firstChild).toHaveClass("items-center");
    expect(container.firstChild).toHaveClass("space-x-2");
  });
});
