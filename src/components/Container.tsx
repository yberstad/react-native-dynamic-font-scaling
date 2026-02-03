import { ScrollView, ScrollViewProps } from 'react-native';
import {
  createRestyleComponent,
  backgroundColor,
  layout,
  spacing,
  border,
  BackgroundColorProps,
  LayoutProps,
  SpacingProps,
  BorderProps,
} from '@shopify/restyle';
import { Theme } from '../theme/theme';

type ScrollRestyleProps = BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme>;

export const Container = createRestyleComponent<
  ScrollRestyleProps & ScrollViewProps,
  Theme
>([backgroundColor, layout, spacing, border], ScrollView);
export type ContainerProps = React.ComponentProps<typeof Container>;
