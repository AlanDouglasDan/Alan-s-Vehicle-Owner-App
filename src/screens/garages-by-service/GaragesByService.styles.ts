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
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 0.73,
    borderColor: palette.BORDER,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.TEXT_HEADING,
    lineHeight: 24,
  },
  text13: {
    ...typography.text13,
    color: palette.SUPPORT,
    lineHeight: 18,
  },
  text17: {
    ...typography.text17,
    color: palette.SUPPORT,
  },
  gap: {
    gap: 8,
  },
});
