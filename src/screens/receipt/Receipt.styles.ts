import {StyleSheet} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    flex: 1,
    flexGrow: 1,
  },
  closeIcon: {
    width: 32,
    height: 32,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  upperBanner: {
    backgroundColor: palette.PRIMARY,
    height: 166,
    paddingHorizontal: 16,
  },
  innerReceipt: {
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: palette.WHITE,
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.BORDER2,
    backgroundColor: palette.NEUTRAL10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gap8: {
    gap: 8,
  },
  semiheader22: {
    ...typography.semiheader22,
    color: palette.NEUTRAL70,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.DEFAULT,
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
  },
  logo: {
    width: 48,
    height: 24,
  },
  semiheader14: {
    ...typography.semiheader14,
    color: palette.PRIMARY,
    textAlign: 'center',
  },
  text10: {
    ...typography.text10,
    color: palette.SUPPORT,
    textAlign: 'center',
  },
  gap: {
    gap: 20,
  },
  button: {
    backgroundColor: palette.NEUTRAL20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
