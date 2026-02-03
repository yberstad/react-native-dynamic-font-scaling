import React from 'react';
import {
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
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
  VariantProps,
} from '@shopify/restyle';
import { Theme } from '../theme/theme';
import { 
  View, 
  TouchableOpacity, 
  TouchableOpacityProps,
  ScrollView,
  ScrollViewProps,
  SafeAreaView,
  TextInput,
  TextInputProps,
} from 'react-native';

/**
 * Box - A View with restyle props for layout, spacing, colors, etc.
 * 
 * @example
 * ```tsx
 * <Box padding="lg" backgroundColor="cardBackground" borderRadius="md">
 *   <Text variant="body">Content</Text>
 * </Box>
 * ```
 */
export const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;

/**
 * Text - A Text component with restyle props and text variants.
 * Disables allowFontScaling since we handle scaling manually in the theme.
 * This bypasses React Native's native font scale caching issue on New Architecture.
 * 
 * @example
 * ```tsx
 * <Text variant="h1">Heading</Text>
 * <Text variant="body" color="textSecondary">Body text</Text>
 * ```
 */
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

const BaseText = React.forwardRef<RNText, RNTextProps>((props, ref) => (
  <RNText ref={ref} allowFontScaling={false} {...props} />
));
BaseText.displayName = 'BaseText';

export const Text = createText<Theme>(BaseText);
export type TextProps = React.ComponentProps<typeof Text>;

/**
 * Card - A Box with card variants for common card patterns.
 * 
 * @example
 * ```tsx
 * <Card variant="elevated">
 *   <Text variant="h4">Card Title</Text>
 *   <Text variant="body">Card content...</Text>
 * </Card>
 * ```
 */
const cardVariant = createVariant<Theme, 'cardVariants'>({
  themeKey: 'cardVariants',
});

export const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>(
  [cardVariant],
  Box
);
export type CardProps = React.ComponentProps<typeof Card>;

/**
 * Pressable - A TouchableOpacity with restyle props.
 * 
 * @example
 * ```tsx
 * <Pressable
 *   padding="md"
 *   backgroundColor="buttonPrimaryBackground"
 *   borderRadius="md"
 *   onPress={handlePress}
 * >
 *   <Text variant="button" color="buttonPrimaryText">Press me</Text>
 * </Pressable>
 * ```
 */
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

/**
 * Container - A ScrollView with restyle props.
 * 
 * @example
 * ```tsx
 * <Container padding="lg" backgroundColor="background">
 *   <Text variant="h1">Scrollable content</Text>
 * </Container>
 * ```
 */
type ScrollRestyleProps = BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme>;

export const Container = createRestyleComponent<
  ScrollRestyleProps & ScrollViewProps,
  Theme
>(
  [backgroundColor, layout, spacing, border],
  ScrollView
);
export type ContainerProps = React.ComponentProps<typeof Container>;

/**
 * SafeArea - A SafeAreaView with restyle props.
 * 
 * @example
 * ```tsx
 * <SafeArea flex={1} backgroundColor="background">
 *   <Text variant="h1">Safe content</Text>
 * </SafeArea>
 * ```
 */
import type { ViewProps } from 'react-native';

type SafeAreaRestyleProps = BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  ViewProps;

export const SafeArea = createRestyleComponent<
  SafeAreaRestyleProps,
  Theme
>(
  [backgroundColor, layout, spacing],
  SafeAreaView
);
export type SafeAreaProps = React.ComponentProps<typeof SafeArea>;

/**
 * Input - A TextInput with restyle props.
 * 
 * @example
 * ```tsx
 * <Input
 *   padding="md"
 *   borderWidth={1}
 *   borderColor="inputBorder"
 *   borderRadius="md"
 *   placeholder="Enter text..."
 * />
 * ```
 */
type InputRestyleProps = BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme>;

export const Input = createRestyleComponent<
  InputRestyleProps & TextInputProps,
  Theme
>(
  [backgroundColor, layout, spacing, border],
  TextInput
);
export type InputProps = React.ComponentProps<typeof Input>;

/**
 * Divider - A simple horizontal divider line.
 * 
 * @example
 * ```tsx
 * <Divider />
 * <Divider marginVertical="lg" />
 * ```
 */
export function Divider(props: Omit<BoxProps, 'height' | 'width'>) {
  return (
    <Box
      height={1}
      backgroundColor="divider"
      width="100%"
      {...props}
    />
  );
}

/**
 * Spacer - A flexible spacer component.
 * 
 * @example
 * ```tsx
 * <Box flexDirection="row">
 *   <Text>Left</Text>
 *   <Spacer />
 *   <Text>Right</Text>
 * </Box>
 * ```
 */
export function Spacer() {
  return <Box flex={1} />;
}
