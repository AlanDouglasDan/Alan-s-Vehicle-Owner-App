import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  text17: {
    ...typography.text17,
    color: palette.DEFAULT,
  },
  pad: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.PRIMARY,
  },
  text13: {
    ...typography.text13,
    color: palette.TEXT_HEADING,
  },
  gap: {
    gap: 12,
  },
  carImage: {
    width: 32,
    height: 32,
    borderWidth: 0.89,
    borderColor: palette.NEUTRAL30,
    backgroundColor: palette.PINK,
  },
});
