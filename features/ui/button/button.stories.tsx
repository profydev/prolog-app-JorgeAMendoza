import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonColor, ButtonSize } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({ size, color, children }) => (
  <div style={{ padding: 50 }}>
    <Button color={color} size={size}>
      {children}
    </Button>
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  children: "Button CTA",
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: ButtonSize.sm,
  color: ButtonColor.secondary,
  children: "Button CTA",
};

export const Gray = Template.bind({});
Gray.args = {
  size: ButtonSize.sm,
  color: ButtonColor.gray,
  children: "Button CTA",
};

export const Empty = Template.bind({});
Empty.args = {
  size: ButtonSize.sm,
  color: ButtonColor.empty,
  children: "Button CTA",
};

export const EmptyGray = Template.bind({});
EmptyGray.args = {
  size: ButtonSize.sm,
  color: ButtonColor.emptyGray,
  children: "Button CTA",
};

export const Error = Template.bind({});
Error.args = {
  size: ButtonSize.sm,
  color: ButtonColor.error,
  children: "Button CTA",
};
