import gradients from './gradients';
import colors from './colors';
import fonts from './fonts';
import vars from './vars';

export { default as H1 } from './components/Text/H1';
export { default as H2 } from './components/Text/H2';
export { default as H3 } from './components/Text/H3';
export { default as P } from './components/Text/Body';

export {
  default as TransitionEnterExit,
} from './components/TransitionEnterExit/TransitionEnterExit';
export { TRANSITION_TYPES } from './components/TransitionEnterExit/TransitionEnterExit';
export {
  default as RouteEnterExit,
} from './components/TransitionEnterExit/RouteEnterExit/RouteEnterExit';

export { default as HollowTriangle } from './components/Shapes/HollowTriangle';

export default {
  gradients,
  colors,
  fonts,
  vars,
};
