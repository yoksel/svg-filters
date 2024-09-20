import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import RadioList from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/RadioList',
  component: RadioList,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof RadioList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
   current: 'id1',
   list: [{id: 'id1', name: 'banana'}, {id: 'id2', name: 'orange'}],
    name: 'name',
    onChange: fn()
  },
};
