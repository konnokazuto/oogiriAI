import type { Meta, StoryObj } from "@storybook/react";
import TextareaWithButton from "./index";

const meta = {
  title: "Components/TextareaWithButton",
  component: TextareaWithButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextareaWithButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    onSubmit: () => {},
    isLoading: false,
    placeholder: "ここに回答を書いてください...",
  },
};

export const WithContent: Story = {
  args: {
    value: "テストの回答です",
    onChange: () => {},
    onSubmit: () => {},
    isLoading: false,
    placeholder: "ここに回答を書いてください...",
  },
};

export const Loading: Story = {
  args: {
    value: "テストの回答です",
    onChange: () => {},
    onSubmit: () => {},
    isLoading: true,
    placeholder: "ここに回答を書いてください...",
  },
};
