import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkbox, CheckboxSize, CheckboxType } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = ({ size, label, checkboxType }) => (
  <div style={{ padding: 50 }}>
    <Checkbox size={size} label={label} checkboxType={checkboxType} />
  </div>
);

export const Small = Template.bind({});
Small.args = {
  size: CheckboxSize.sm,
  label: "Label",
  checkboxType: CheckboxType.check,
};

export const Medium = Template.bind({});
Medium.args = {
  size: CheckboxSize.md,
  label: "Label",
  checkboxType: CheckboxType.check,
};

export const SmallPartly = Template.bind({});
SmallPartly.args = {
  size: CheckboxSize.sm,
  label: "Label",
  checkboxType: CheckboxType.partly,
};

export const MediumPartly = Template.bind({});
MediumPartly.args = {
  size: CheckboxSize.md,
  label: "Label",
  checkboxType: CheckboxType.partly,
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: CheckboxSize.md,
  label: "Label",
  checkboxType: CheckboxType.check,
  disabled: true,
};
