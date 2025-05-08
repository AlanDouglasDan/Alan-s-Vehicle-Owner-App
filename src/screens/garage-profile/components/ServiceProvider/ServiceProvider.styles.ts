import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  semiheader16: {
    ...typography.semiheader16,
    color: palette.TEXT_HEADING,
    lineHeight: 24,
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
    lineHeight: 18,
  },
  text16: {
    ...typography.text16,
    color: palette.DEFAULT,
  },
  gap: {
    gap: 8,
  },
});
