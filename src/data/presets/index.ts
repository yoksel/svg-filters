import grayscale from './grayscale.json';
import smoke from './smoke.json';
import paper from './paper.json';
import watercolor from './watercolor.json';
import waterDrops from './waterDrops.json';
import paintDrops from './paintDrops.json';
import stroke from './stroke.json';
import dancingStroke from './dancingStroke.json';
import contour from './contour.json';
import zebra from './zebra.json';
import net from './net.json';
import layeredNet from './layeredNet.json';
import dust from './dust.json';
import shadow from './shadow.json';
import innerShadow from './innerShadow.json';
import waves from './waves.json';
import coloredSpots from './coloredSpots.json';
import coloredSpots2 from './coloredSpots2.json';
import coloredStripesVert from './coloredStripesVert.json';
import coloredFlame from './coloredFlame.json';

// Types of property 'primitives' are incompatible.
//     Type '{ id: string; params: { type: { value: string; }; values: { value: string; variants: { key: string; }; }; in: { value: string; }; result: { value: string; }; }; groupName: string; }[]' is not assignable to type '[{}]'.

interface Primitive {
  id: string;
  params: {
    type: { value: string };
    values: { value: string; variants: { key: string } };
    in: { value: string };
    result: { value: string };
  };
  groupName: string;
}

interface Preset {
  id: string;
  name: string;
  primitives: Primitive[];
}

const presets: any[] = [
  grayscale,
  shadow,
  innerShadow,
  stroke,
  dancingStroke,
  contour,
  smoke,
  waves,
  paper,
  watercolor,
  waterDrops,
  paintDrops,
  zebra,
  net,
  layeredNet,
  dust,
  coloredStripesVert,
  coloredSpots,
  coloredSpots2,
  coloredFlame,
];

export default presets;
