// src/theme/textStyles.ts

import { TextStyle } from 'react-native';
import { typography, TextVariant } from './typography';

type TextStyles = Record<TextVariant, TextStyle>;

export const textStyles: TextStyles = {
  h1: { fontFamily: typography.fontFamily, ...typography.h1 },
  h2: { fontFamily: typography.fontFamily, ...typography.h2 },
  h3: { fontFamily: typography.fontFamily, ...typography.h3 },

  body: { fontFamily: typography.fontFamily, ...typography.body },
  bodySmall: {
    fontFamily: typography.fontFamily,
    ...typography.bodySmall,
  },

  meta: { fontFamily: typography.fontFamily, ...typography.meta },
  caption: {
    fontFamily: typography.fontFamily,
    ...typography.caption,
  },

  label: { fontFamily: typography.fontFamily, ...typography.label },
};