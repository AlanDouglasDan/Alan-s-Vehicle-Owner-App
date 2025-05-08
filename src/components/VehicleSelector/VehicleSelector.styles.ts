import {palette, typography} from 'core/styles';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // bottom sheet
  content: {
    width: '100%',
    backgroundColor: palette.WHITE,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 18,
  },
  carImage: {
    width: 32,
    height: 32,
    borderWidth: 0.89,
    borderColor: palette.NEUTRAL30,
    backgroundColor: palette.PINK,
  },
  gap: {
    gap: 16,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.DEFAULT,
  },
  text13: {
    ...typography.text13,
    color: palette.DEFAULT,
  },
  semiheader20: {
    ...typography.semiheader20,
    color: palette.TEXT_HEADING,
  },
  optionContainer: {
    paddingLeft: -6,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    paddingRight: 0,
  },
});
