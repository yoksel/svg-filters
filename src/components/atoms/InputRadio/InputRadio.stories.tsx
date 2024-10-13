import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputRadio from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/InputRadio',
  component: InputRadio,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof InputRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'id',
    name: 'name',
    value: 'value',
    checked: true,
    hidden: false,
    onChange: fn(),
  },
};
