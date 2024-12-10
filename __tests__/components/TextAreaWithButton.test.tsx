import { render, screen, fireEvent } from "@testing-library/react";
import TextareaWithButton from "@/app/components/TextareaWithButton";
import "@testing-library/jest-dom";

describe("TextareaWithButton", () => {
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    // 各テスト前にモックをリセット
    mockOnChange.mockClear();
    mockOnSubmit.mockClear();
  });

  // 基本的なレンダリングテスト
  it("renders textarea and submit button", () => {
    render(
      <TextareaWithButton
        value=""
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("回答する")).toBeInTheDocument();
  });

  // 文字数カウンターのテスト
  it("displays character count", () => {
    render(
      <TextareaWithButton
        value="テスト"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    expect(screen.getByText("3 / 30文字")).toBeInTheDocument();
  });

  // バリデーションメッセージのテスト
  it("shows validation message when exceeding character limit", () => {
    render(
      <TextareaWithButton
        value="これは30文字を超える長いテストメッセージです。これは30文字を超える長いテストメッセージです。"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    // テキストエリアにフォーカスして離すことで、isDirtyフラグを立てる
    const textarea = screen.getByRole("textbox");
    fireEvent.focus(textarea);
    fireEvent.blur(textarea);

    expect(
      screen.getByText("30文字以内で入力してください")
    ).toBeInTheDocument();
  });

  // 空入力のバリデーションテスト
  it("shows empty validation message after input and deletion", () => {
    render(
      <TextareaWithButton
        value=""
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    // テキストエリアにフォーカスして離すことで、isDirtyフラグを立てる
    const textarea = screen.getByRole("textbox");
    fireEvent.focus(textarea);
    fireEvent.blur(textarea);

    expect(screen.getByText("回答を入力してください")).toBeInTheDocument();
  });

  // ボタンの無効化テスト
  it("disables submit button when input is invalid", () => {
    render(
      <TextareaWithButton
        value=""
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });

  // ローディング状態のテスト
  it("shows loading state", () => {
    render(
      <TextareaWithButton
        value="valid input"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={true}
      />
    );

    expect(screen.getByRole("button")).toBeDisabled();
    // Loader2コンポーネントの存在を確認（実装方法によって変更が必要かも）
    expect(screen.getByRole("button")).toHaveClass("cursor-not-allowed");
  });

  // 送信ボタンクリックのテスト
  it("calls onSubmit when button is clicked", () => {
    render(
      <TextareaWithButton
        value="valid input"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  // カスタムmaxLengthのテスト
  it("respects custom maxLength prop", () => {
    render(
      <TextareaWithButton
        value="test"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
        maxLength={10}
      />
    );

    expect(screen.getByText("4 / 10文字")).toBeInTheDocument();
  });
});
