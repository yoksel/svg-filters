import type { Meta, StoryObj } from '@storybook/react';
import Placeholder from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Placeholder',
  component: Placeholder,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    elemClientRect: {height: '30px'},
    isDragging: false
  },
};
