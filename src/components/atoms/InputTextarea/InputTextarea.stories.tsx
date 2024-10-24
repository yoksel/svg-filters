import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputTextarea from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/InputTextarea',
  component: InputTextarea,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof InputTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    firstValue: 'firstValue',
    secondValue: 'secondValue',
    value: 'value',
    onChange: fn()
  },
};
