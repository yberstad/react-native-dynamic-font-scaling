import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { createText } from '@shopify/restyle';
import { Theme } from '../theme/theme';

const BaseText = React.forwardRef<RNText, RNTextProps>((props, ref) => (
  <RNText ref={ref} allowFontScaling={false} {...props} />
));
BaseText.displayName = 'BaseText';

export const Text = createText<Theme>(BaseText);
export type TextProps = React.ComponentProps<typeof Text>;
