import {StyleSheet, Platform} from 'react-native';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 16 : 32,
  },
  semiheader20: {
    ...typography.semiheader20,
    color: palette.TEXT_HEADING,
  },
  capitalize: {
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
    textAlign: 'center',
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
    backgroundColor: palette.BLACK,
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
    borderRadius: 15,
    gap: 8,
  },
  bottomContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 16,
  },
  bottomInnerContainer: {
    borderRadius: 4,
    backgroundColor: palette.GRAY,
    padding: 16,
    gap: 16,
    paddingBottom: 50,
  },
  whiteCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.WHITE,
    marginBottom: 8,
  },
  w25: {
    width: '25%',
  },
});
