import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
    paddingBottom: 48,
  },
  text16: {
    ...typography.text16,
    color: palette.SUPPORT,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: palette.WHITE,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: palette.BORDER,
    borderRadius: 15,
    gap: 8,
  },
  input2: {
    flex: 1,
    ...typography.text16,
    lineHeight: 18,
    color: palette.BLACK,
  },
  inputFocus: {
    borderWidth: 1,
    borderColor: palette.PRIMARY,
  },
  semiheader20: {
    ...typography.semiheader20,
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
  gap: {
    gap: 8,
  },
  filterContainer: {
    borderWidth: 1,
    borderColor: palette.NEUTRAL30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    padding: 10,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  // bottom sheet
  content: {
    width: '100%',
    backgroundColor: palette.WHITE,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 18,
    height: hp(30),
  },
  flexedContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: palette.NEUTRAL30,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
