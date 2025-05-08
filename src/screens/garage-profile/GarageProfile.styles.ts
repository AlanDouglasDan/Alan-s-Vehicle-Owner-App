import {Platform, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {palette, typography} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: palette.WHITE,
  },
  innerContainer: {
    padding: 20,
    flex: 1,
    // backgroundColor: palette.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  semiheader20: {
    ...typography.semiheader20,
    color: palette.TEXT_HEADING,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  gap: {
    gap: 8,
  },
  statusContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: palette.LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: 4,
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: palette.TEXT_HEADING,
    paddingBottom: 17,
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: palette.NEUTRAL30,
  },

  // bottom sheet
  content: {
    width: '100%',
    backgroundColor: palette.WHITE,
    paddingBottom: 40,
    paddingHorizontal: 18,
    height: hp(60),
  },
  text11: {
    ...typography.text11,
    color: palette.SUPPORT,
  },
  input: {
    ...typography.text17,
    width: '100%',
    paddingVertical: 16,
    backgroundColor: palette.WHITE,
    marginTop: 8,
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
    }),
    color: palette.DEFAULT,
    borderWidth: 1,
    borderColor: palette.NEUTRAL30,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 4,
  },
});
