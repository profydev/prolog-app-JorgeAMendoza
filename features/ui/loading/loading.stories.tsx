import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Loading, LoadingSize } from "./Loading";

export default {
  title: "UI/Loading",
  component: Loading,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Loading>;

const Template: StoryFn<typeof Loading> = ({ size }) => (
  <div style={{ padding: 50 }}>
    <Loading size={size} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: LoadingSize.sm,
};
Default.parameters = {
  viewMode: "docs",
};
