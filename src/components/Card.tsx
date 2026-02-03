import { createRestyleComponent, createVariant, VariantProps } from '@shopify/restyle';
import { Theme } from '../theme/theme';
import { Box } from './Box';

const cardVariant = createVariant<Theme, 'cardVariants'>({
  themeKey: 'cardVariants',
});

export const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([cardVariant], Box);
export type CardProps = React.ComponentProps<typeof Card>;
