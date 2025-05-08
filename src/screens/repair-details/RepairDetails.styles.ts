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
    color: palette.DEFAULT,
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
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: palette.NEUTRAL30,
  },
  tab: {
    paddingHorizontal: 4,
    paddingBottom: 19,
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: palette.TEXT_HEADING,
    paddingBottom: 17,
  },
  carImage: {
    width: 32,
    height: 32,
    borderWidth: 0.89,
    borderColor: palette.NEUTRAL30,
    backgroundColor: palette.PINK,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.BORDER2,
    backgroundColor: palette.NEUTRAL10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gap8: {
    gap: 8,
  },
  header22: {
    ...typography.header22,
    color: palette.DEFAULT,
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
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.NEUTRAL20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gap16: {
    gap: 16,
  },
});

