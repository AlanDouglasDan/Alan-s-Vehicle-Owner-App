import {StyleSheet, Platform} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'ios' ? 24 : 48,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    width: '100%',
    backgroundColor: palette.NEUTRAL20,
    marginTop: 12,
  },
  progressValue: {
    backgroundColor: palette.TEXT_HEADING,
    height: '100%',
    borderRadius: 2,
    width: '50%',
  },
});
