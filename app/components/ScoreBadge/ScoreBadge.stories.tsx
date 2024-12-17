import type { Meta, StoryObj } from "@storybook/react";
import ScoreBadge from "./index";

const meta = {
  title: "Components/ScoreBadge",
  component: ScoreBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScoreBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HighScore: Story = {
  args: {
    score: 95,
    size: "large",
  },
};

export const MediumScore: Story = {
  args: {
    score: 75,
    size: "large",
  },
};

export const LowScore: Story = {
  args: {
    score: 60,
    size: "large",
  },
};

export const SmallSize: Story = {
  args: {
    score: 95,
    size: "small",
  },
};
