import type { Meta, StoryObj } from "@storybook/react";
import PromptButton from "./index";

const meta = {
  title: "Components/PromptButton",
  component: PromptButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PromptButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    onClick: () => console.log("clicked"),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onClick: () => console.log("clicked"),
  },
};
