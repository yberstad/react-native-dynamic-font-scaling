import { TextInput, TextInputProps } from 'react-native';
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

type InputRestyleProps = BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme>;

export const Input = createRestyleComponent<
  InputRestyleProps & TextInputProps,
  Theme
>([backgroundColor, layout, spacing, border], TextInput);
export type InputProps = React.ComponentProps<typeof Input>;
