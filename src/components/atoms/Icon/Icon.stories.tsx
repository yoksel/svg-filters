import type { Meta, StoryObj } from '@storybook/react';
import Icon from './index';
import Icons from '../Icons';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Icons />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    symbol: 'doc',
    color: 'teal',
    size: '20',
  },
};
