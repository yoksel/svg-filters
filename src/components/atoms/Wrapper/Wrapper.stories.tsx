import type { Meta, StoryObj } from '@storybook/react';
import Wrapper from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Wrapper',
  component: Wrapper,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet feugiat enim. Cras lobortis, ante sit amet tempor tincidunt, libero augue pretium mi, faucibus fringilla eros purus id turpis. Aliquam felis nibh, faucibus nec nibh at, volutpat venenatis ipsum. Aliquam efficitur volutpat orci. Donec efficitur elit in augue consectetur, et elementum tellus tincidunt. Duis aliquet, est sit amet venenatis elementum, risus nunc semper sapien, et rutrum nunc risus ac velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi at lacus mattis, cursus est sit amet, semper erat.',
  },
};
