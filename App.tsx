import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  ScaledThemeProvider, 
  useFontScaleValue,
  Box, 
  Text, 
  Card, 
  Pressable,
  SafeArea,
  Container,
  Divider,
} from './src';

/**
 * Demo component showing how text variants scale with different caps
 */
function TypographyDemo() {
  const fontScale = useFontScaleValue();

  return (
    <Card variant="elevated" marginBottom="lg">
      <Text variant="h5" marginBottom="md">Typography Variants</Text>
      <Text variant="caption" marginBottom="sm">
        Font scale: {fontScale.toFixed(2)}x
      </Text>
      
      <Text variant="h1" marginBottom="xs">H1 Heading</Text>
      <Text variant="h2" marginBottom="xs">H2 Heading</Text>
      <Text variant="h3" marginBottom="xs">H3 Heading</Text>
      
      <Divider marginVertical="md" />
      
      <Text variant="body" marginBottom="sm">
        Body text scales up to 2.0x for better readability in long-form content.
      </Text>
      <Text variant="bodySmall" marginBottom="sm" color="textSecondary">
        Smaller body text for secondary information.
      </Text>
      <Text variant="caption" color="textSecondary">
        Caption text (1.8x cap) for labels and annotations.
      </Text>
    </Card>
  );
}

/**
 * Demo component showing button scaling
 */
function ButtonDemo() {
  return (
    <Card variant="outlined" marginBottom="lg">
      <Text variant="h5" marginBottom="md">Button Variants (1.3x cap)</Text>
      <Text variant="bodySmall" marginBottom="md" color="textSecondary">
        Buttons have a lower scale cap due to space constraints
      </Text>
      
      <Pressable
        backgroundColor="buttonPrimaryBackground"
        paddingVertical="md"
        paddingHorizontal="xl"
        borderRadius="md"
        marginBottom="sm"
        alignItems="center"
      >
        <Text variant="button" color="buttonPrimaryText">
          Primary Button
        </Text>
      </Pressable>
      
      <Pressable
        backgroundColor="buttonSecondaryBackground"
        paddingVertical="md"
        paddingHorizontal="xl"
        borderRadius="md"
        marginBottom="sm"
        alignItems="center"
      >
        <Text variant="button" color="buttonSecondaryText">
          Secondary Button
        </Text>
      </Pressable>
      
      <Pressable
        backgroundColor="transparent"
        paddingVertical="md"
        paddingHorizontal="xl"
        borderRadius="md"
        borderWidth={1}
        borderColor="primary"
        alignItems="center"
      >
        <Text variant="button" color="primary">
          Outlined Button
        </Text>
      </Pressable>
    </Card>
  );
}

/**
 * Demo component showing spacing scaling
 */
function SpacingDemo() {
  return (
    <Card variant="outlined" marginBottom="lg">
      <Text variant="h5" marginBottom="md">Spacing (1.5x cap)</Text>
      <Text variant="bodySmall" marginBottom="md" color="textSecondary">
        Spacing scales proportionally but is capped to prevent excessive whitespace
      </Text>
      
      <Box flexDirection="row" marginBottom="sm">
        <Box 
          backgroundColor="primary" 
          padding="xs" 
          borderRadius="sm"
          marginRight="xs"
        >
          <Text variant="caption" color="textInverse">xs</Text>
        </Box>
        <Box 
          backgroundColor="primary" 
          padding="sm" 
          borderRadius="sm"
          marginRight="xs"
        >
          <Text variant="caption" color="textInverse">sm</Text>
        </Box>
        <Box 
          backgroundColor="primary" 
          padding="md" 
          borderRadius="sm"
          marginRight="xs"
        >
          <Text variant="caption" color="textInverse">md</Text>
        </Box>
        <Box 
          backgroundColor="primary" 
          padding="lg" 
          borderRadius="sm"
        >
          <Text variant="caption" color="textInverse">lg</Text>
        </Box>
      </Box>
    </Card>
  );
}

/**
 * Instructions for testing the font scale feature
 */
function TestInstructions() {
  return (
    <Card variant="elevated" marginBottom="lg" backgroundColor="info">
      <Text variant="h6" marginBottom="sm" color="white">
        🧪 How to Test
      </Text>
      <Text variant="bodySmall" color="white" marginBottom="xs">
        1. Open Android Settings → Display → Font size
      </Text>
      <Text variant="bodySmall" color="white" marginBottom="xs">
        2. Change the font size slider
      </Text>
      <Text variant="bodySmall" color="white" marginBottom="xs">
        3. Return to this app
      </Text>
      <Text variant="bodySmall" color="white">
        4. The UI should automatically update! ✨
      </Text>
    </Card>
  );
}

/**
 * Main app content wrapped in the theme
 */
function AppContent() {
  const fontScale = useFontScaleValue();
  
  return (
    <SafeArea flex={1} backgroundColor="background">
      <Container 
        flex={1} 
        padding="lg"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text variant="h2" marginBottom="sm">
          Dynamic Font Scaling
        </Text>
        <Text variant="body" marginBottom="lg" color="textSecondary">
          Current scale: {fontScale.toFixed(2)}x
        </Text>
        
        <TestInstructions />
        <TypographyDemo />
        <ButtonDemo />
        <SpacingDemo />
        
        <StatusBar style="auto" />
      </Container>
    </SafeArea>
  );
}

/**
 * Root App component with ScaledThemeProvider
 * 
 * The ScaledThemeProvider:
 * - Reads font scale from native Android module (bypasses RN cache)
 * - Listens for app state changes to detect settings changes
 * - Recreates the theme when font scale changes
 * - All child components using restyle will re-render with new theme
 */
export default function App() {
  return (
    <ScaledThemeProvider 
      minScale={0.8} 
      maxScale={2.0}
      listenToAppState={true}
      listenToDimensions={true}
    >
      <AppContent />
    </ScaledThemeProvider>
  );
}
