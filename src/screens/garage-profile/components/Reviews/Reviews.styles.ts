import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  semiheader16: {
    ...typography.semiheader16,
    color: palette.TEXT_HEADING,
    lineHeight: 24,
    textTransform: 'capitalize',
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
    lineHeight: 18,
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 21,
    borderWidth: 0.73,
    borderColor: palette.BORDER,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  header32: {
    ...typography.header32,
    color: palette.BROWN,
    textAlign: 'center',
  },
  gap: {
    gap: 8,
  },
});
