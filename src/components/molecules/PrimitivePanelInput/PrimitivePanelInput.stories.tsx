import type { Meta, StoryObj } from '@storybook/react';
import PrimitivePanelInput from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/PrimitivePanelInput',
  component: PrimitivePanelInput,
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
} satisfies Meta<typeof PrimitivePanelInput>;

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
    },
    paramKey: 'x',
    resultsList: ['23', '35'],
    parentId: 'parentId',
  }
};

