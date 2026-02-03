import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import {
  createRestyleComponent,
  backgroundColor,
  layout,
  spacing,
  BackgroundColorProps,
  LayoutProps,
  SpacingProps,
} from '@shopify/restyle';
import { Theme } from '../theme/theme';

type SafeAreaRestyleProps = BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  SafeAreaViewProps;

export const SafeArea = createRestyleComponent<SafeAreaRestyleProps, Theme>(
  [backgroundColor, layout, spacing],
  SafeAreaView
);
export type SafeAreaProps = React.ComponentProps<typeof SafeArea>;
