import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {palette} from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.BLACK,
  },
  innerContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hotelImage: {
    width: wp(100),
    height: '100%',
  },
  closeIcon: {
    width: 32,
    height: 32,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  preview: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  active: {
    borderWidth: 1,
    borderColor: palette.WHITE,
    borderRadius: 10,
  },
});
