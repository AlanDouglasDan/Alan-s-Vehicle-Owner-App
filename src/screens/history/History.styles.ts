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
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.DEFAULT,
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: palette.WHITE,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: palette.BORDER,
    borderRadius: 15,
    gap: 8,
    marginVertical: 24,
  },
  input2: {
    flex: 1,
    ...typography.text16,
    lineHeight: 18,
    color: palette.BLACK,
  },
  inputFocus: {
    borderWidth: 1,
    borderColor: palette.PRIMARY,
  },
  gap: {
    gap: 12,
  },
  gap30: {
    gap: 30,
  },
  carImage: {
    width: 32,
    height: 32,
    borderWidth: 0.89,
    borderColor: palette.NEUTRAL30,
    backgroundColor: palette.PINK,
  },
  image: {
    width: 40,
    height: 40,
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
  text14: {
    ...typography.text14,
    color: palette.DEFAULT,
  },
  semiheader22: {
    ...typography.semiheader22,
    color: palette.NEUTRAL70,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
    backgroundColor: palette.LIGHT_GREEN,
  },
  text12: {
    ...typography.text12,
    color: palette.GREEN,
  },
});
