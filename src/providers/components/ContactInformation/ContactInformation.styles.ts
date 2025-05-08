import {StyleSheet, Platform} from 'react-native';

import {font} from 'core/utils';
import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 0 : 32,
    paddingHorizontal: 20,
  },
  sheetModal: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 1)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  header20: {
    ...typography.semiheader20,
    color: palette.TEXT_HEADING,
    marginTop: 10,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  mediumText: {
    fontFamily: font.medium,
    color: palette.TEXT_HEADING,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.PRIMARY,
    textAlign: 'center',
    marginTop: 20,
  },
  gap: {
    gap: 8,
  },
});
