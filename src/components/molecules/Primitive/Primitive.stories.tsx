import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import Primitive from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/Primitive',
  component: Primitive,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <p>It won't be visible on page, check page source</p>
        <svg>
          <Story />
        </svg>
      </>
    ),
  ],
} satisfies Meta<typeof Primitive>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    primitive: {
      id: 2,
      groupName: 'blur',
      params: {
        x: {
         value: '23',
         disabled: true
        }
      }
    }
  }
};

