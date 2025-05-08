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
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.BLACK,
    marginTop: 20,
  },
  text17: {
    ...typography.text17,
    color: palette.SUPPORT,
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: palette.NEUTRAL30,
  },
  tab: {
    paddingHorizontal: 4,
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: palette.PRIMARY,
    paddingBottom: 17,
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
  },
  text14: {
    ...typography.text14,
    color: palette.SUPPORT,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.BORDER2,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  text12: {
    ...typography.text12,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.TEXT_HEADING,
  },
  line: {
    height: 1,
    backgroundColor: palette.BORDER2,
    marginVertical: 16,
  },
  gap: {
    gap: 16,
  },
  gap4: {
    gap: 4,
  },
  text16: {
    ...typography.text16,
    color: palette.DEFAULT,
  },
  header22: {
    ...typography.header22,
    color: palette.DEFAULT,
  },
});
