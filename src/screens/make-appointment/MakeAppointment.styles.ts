import {StyleSheet} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';

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
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  text17: {
    ...typography.text17,
    lineHeight: 20,
    color: palette.SUPPORT,
  },
  semiheader28: {
    ...typography.semiheader28,
    color: palette.TEXT_HEADING,
  },
  semiheader17: {
    ...typography.semiheader17,
    color: palette.TEXT_HEADING,
  },
  gap: {
    gap: 8,
  },
  p14: {
    padding: 14,
  },
  optionContainer: {
    paddingLeft: 0,
    marginLeft: 0,
    paddingVertical: 0,
    marginVertical: 0,
    backgroundColor: 'transparent',
  },
  optionLabel: {
    fontWeight: 400,
  },
  marginalize: {
    // marginLeft: -10,
  },

  // bottom sheet
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: palette.WHITE,
    padding: 25,
    ...ifIphoneX({paddingBottom: 20}, {paddingBottom: 10}),
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
});
