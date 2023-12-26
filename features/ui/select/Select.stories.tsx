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
