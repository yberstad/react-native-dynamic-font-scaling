import { Box, BoxProps } from './Box';

export function Divider(props: Omit<BoxProps, 'height' | 'width'>) {
  return <Box height={1} backgroundColor="divider" width="100%" {...props} />;
}
