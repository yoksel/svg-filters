import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputText from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/InputText',
  component: InputText,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    firstValue: 'firstValue',
    secondValue: 'secondValue',
    value: 'value',
    type: 'text',
    onChange: fn()
  },
};


export const Number: Story = {
  args: {
    firstValue: 'firstValue',
    secondValue: 'secondValue',
    value: '123',
    type: 'number',
    step: 1,
    min: 0,
    max: 20,
    onChange: fn()
  },
};

