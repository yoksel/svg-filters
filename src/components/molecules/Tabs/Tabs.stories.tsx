import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Tabs from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
   active: 'docs',
  items: [
    {id: 'playground', name: 'Playground', content: 'div'},
    {id: 'docs', name: 'Docs', content: 'div'}
  ]
  },
};
