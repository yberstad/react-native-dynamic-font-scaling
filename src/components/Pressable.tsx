import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import {
  createRestyleComponent,
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  border,
  shadow,
  position,
  BackgroundColorProps,
  OpacityProps,
  VisibleProps,
  LayoutProps,
  SpacingProps,
  BorderProps,
  ShadowProps,
  PositionProps,
} from '@shopify/restyle';
import { Theme } from '../theme/theme';

type PressableRestyleProps = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme>;

export const Pressable = createRestyleComponent<
  PressableRestyleProps & TouchableOpacityProps,
  Theme
>(
  [backgroundColor, opacity, visible, layout, spacing, border, shadow, position],
  TouchableOpacity
);
export type PressableProps = React.ComponentProps<typeof Pressable>;
