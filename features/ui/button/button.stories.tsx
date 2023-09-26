import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonColor, ButtonSize } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({ size, color, children }) => (
  <div style={{ padding: 50 }}>
    <Button color={color} size={size}>
      {children}
    </Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  children: "Button CTA",
};
Default.parameters = {
  viewMode: "docs",
};
