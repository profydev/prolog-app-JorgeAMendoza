import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Select } from "./Select";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = ({
  options,
  defaultSelected,
  groupName,
  ariaText,
  placeholder,
  icon,
  disabled,
  label,
  hintText,
  error,
  errorText,
}) => (
  <div style={{ padding: 50, width: "320px" }}>
    <Select
      options={options}
      defaultSelected={defaultSelected}
      groupName={groupName}
      ariaText={ariaText}
      action={() => {}}
      placeholder={placeholder}
      icon={icon}
      disabled={disabled}
      label={label}
      hintText={hintText}
      error={error}
      errorText={errorText}
    />
  </div>
);

const options = [
  { name: "Phoenix Baker", value: "Phoenix Baker" },
  { name: "Olivia Rhye", value: "Olivia Rhye" },
  { name: "Lana Steiner", value: "Lana Steiner" },
  { name: "Demi Wilkinson", value: "Demi Wilkinson" },
  { name: "Candice Wu", value: "Candice Wu" },
  { name: "Natali Wong", value: "Natali Wong" },
  { name: "Drew Cano", value: "Drew Cano" },
];

const defaultValue = { name: "Olivia Rhye", value: "Olivia Rhye" };

export const Empty = Template.bind({});
Empty.args = {
  options,
  groupName: "empty",
  ariaText: "Empty",
  placeholder: "Select a team member",
};

export const WithDefault = Template.bind({});
WithDefault.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
};

export const Disabled = Template.bind({});
Disabled.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select a team member",
  disabled: true,
};

export const EmptyWithIcon = Template.bind({});
EmptyWithIcon.args = {
  options,
  groupName: "empty",
  ariaText: "Empty",
  placeholder: "Select a team member",
  icon: "/icons/user.svg",
};

export const WithDefaultIcon = Template.bind({});
WithDefaultIcon.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  icon: "/icons/user.svg",
};

export const WithIconDisabled = Template.bind({});
WithIconDisabled.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select a team member",
  disabled: true,
  icon: "/icons/user.svg",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  label: "Team Member",
};

export const WithLabelSelected = Template.bind({});
WithLabelSelected.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  label: "Team Member",
  icon: "/icons/user.svg",
};

export const WithLabelDisabled = Template.bind({});
WithLabelDisabled.args = {
  options,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select a team member",
  disabled: true,
  label: "Team Member",
};

export const WithHintText = Template.bind({});
WithHintText.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  hintText: "Hint Text",
};

export const WithHintTextSelected = Template.bind({});
WithHintTextSelected.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  hintText: "Hint Text",
};

export const WithErrorEmpty = Template.bind({});
WithErrorEmpty.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  error: true,
};

export const WithErrorSelected = Template.bind({});
WithErrorSelected.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  error: true,
};

export const WithErrorDisabled = Template.bind({});
WithErrorDisabled.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select a team member",
  disabled: true,
  error: true,
};

export const WithErrorEmptyIcon = Template.bind({});
WithErrorEmptyIcon.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  error: true,
  icon: "/icons/user.svg",
};

export const WithErrorSelectedIcon = Template.bind({});
WithErrorSelectedIcon.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  error: true,
  icon: "/icons/user.svg",
};

export const WithErrorDisabledIcon = Template.bind({});
WithErrorDisabledIcon.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select a team member",
  disabled: true,
  error: true,
  icon: "/icons/user.svg",
};

export const WithErrorEmptyMessage = Template.bind({});
WithErrorEmptyMessage.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  error: true,
  errorText: "This is a error message.",
};

export const WithErrorSelectedMessage = Template.bind({});
WithErrorSelectedMessage.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select a team member",
  error: true,
  errorText: "This is a error message.",
};

export const WithErrorDisabledMessage = Template.bind({});
WithErrorDisabledMessage.args = {
  options,
  defaultSelected: defaultValue,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select a team member",
  disabled: true,
  error: true,
  errorText: "This is a error message.",
};
