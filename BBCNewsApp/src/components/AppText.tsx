// src/components/AppText.tsx

import React from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { textStyles } from '../theme/textStyles';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySmall'
  | 'meta'
  | 'caption'
  | 'label';

interface Props extends TextProps {
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>; // ✅ FIXED
}

export const AppText = ({
  variant = 'body',
  color,
  style,
  children,
  ...props
}: Props) => {
  return (
    <Text
      allowFontScaling
      maxFontSizeMultiplier={1.5}
      style={[
        styles.base,
        textStyles[variant],
        color ? { color } : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});