import {StyleSheet} from 'react-native';

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
    paddingBottom: 24,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  text14: {
    ...typography.text14,
    color: palette.DARK_GRAY,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  semiheader20: {
    ...typography.semiheader20,
    color: palette.TEXT_HEADING,
  },
  gap: {
    gap: 8,
  },
  gap16: {
    gap: 16,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.PRIMARY,
    textAlign: 'center',
  },
  semiheader17: {
    ...typography.semiheader17,
    color: palette.DEFAULT,
  },
  line: {
    height: 1,
    backgroundColor: palette.NEUTRAL40,
    marginVertical: 16,
    opacity: 0.25,
  },
  gap8: {
    gap: 8,
  },
  semiheader16Default: {
    ...typography.semiheader16,
    color: palette.DEFAULT,
  },
  text13: {
    ...typography.text13,
    color: palette.DEFAULT,
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 21,
  },
});
