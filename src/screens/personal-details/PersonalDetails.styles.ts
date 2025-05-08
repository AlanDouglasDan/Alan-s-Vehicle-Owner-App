import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 16,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 44,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.BLACK,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
    textAlign: 'center',
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.BORDER2,
  },
  imgCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: palette.SUPPORT,
    backgroundColor: palette.NEUTRAL10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  semiheader22: {
    ...typography.semiheader22,
    color: palette.NEUTRAL70,
  },
  absoluteCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.NEUTRAL20,
    position: 'absolute',
    right: -5,
    bottom: 0,
    zIndex: 2,
  },
  text12: {
    ...typography.text12,
    color: palette.SUCCESS,
  },
  line: {
    height: 1,
    backgroundColor: palette.NEUTRAL20,
    marginVertical: 16,
  },
  text16: {
    ...typography.text16,
    color: palette.DEFAULT,
  },
  gap: {
    gap: 8,
  },
});
