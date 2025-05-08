import {StyleSheet, Platform} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 16 : 32,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 44,
  },
  semiheader20: {
    ...typography.semiheader20,
    color: palette.TEXT_HEADING,
    textTransform: 'capitalize',
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.TEXT_HEADING,
  },
  text16: {
    ...typography.text16,
    color: palette.TEXT_HEADING,
    flex: 1,
  },
  text12: {
    ...typography.text12,
    color: palette.DEFAULT,
  },
  gap: {
    gap: 10,
  },
  gap4: {
    gap: 4,
  },
  statusBar: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    // backgroundColor: palette.BLACK,
  },
  car: {
    height: 109,
    width: '100%',
  },
  text14: {
    ...typography.text14,
    color: palette.DEFAULT,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: palette.WHITE,
    paddingHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: palette.BORDER,
    gap: 8,
  },
  empty: {
    width: 72,
    height: 72,
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
});
