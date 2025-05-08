import {Platform, StyleSheet} from 'react-native';

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
  optionContainer: {
    paddingLeft: -6,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    paddingRight: 0,
  },
  optionLabel: {
    fontWeight: 400,
  },
  marginalize: {
    marginLeft: -10,
  },
  text11: {
    ...typography.text11,
    color: palette.SUPPORT,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    width: '100%',
    backgroundColor: palette.NEUTRAL20,
    marginTop: 24,
    marginBottom: 8,
  },
  progressValue: {
    backgroundColor: palette.TEXT_HEADING,
    height: '100%',
    borderRadius: 2,
    width: '50%',
  },
  input: {
    width: '100%',
    backgroundColor: palette.WHITE,
    marginTop: 8,
    padding: 16,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
    }),
    borderWidth: 1,
    borderColor: palette.NEUTRAL30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
  },
  inputText: {
    ...typography.text17,
    color: palette.DEFAULT,
  },
  label: {
    ...typography.semiheader17,
    color: palette.TEXT_HEADING,
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 21,
  },

  gap8: {
    gap: 8,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.DEFAULT,
  },
  text13: {
    ...typography.text13,
    color: palette.DEFAULT,
  },
});
