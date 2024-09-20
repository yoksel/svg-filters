import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputSelect from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/InputSelect',
  component: InputSelect,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof InputSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    valuesList: ['apple', 'orange', 'banana'],
    firstValue: 'firstValue',
    secondValue: 'secondValue',
    value: 'apple',
    onChange: fn()
  },
};
