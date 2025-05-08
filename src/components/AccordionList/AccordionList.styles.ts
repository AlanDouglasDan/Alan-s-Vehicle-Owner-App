import {palette, typography} from 'core/styles';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  child: {
    marginTop: 10,
  },
  text16: {
    color: palette.DEFAULT,
    ...typography.text16,
    flex: 1,
  },
  text14: {
    ...typography.text14,
    color: palette.TEXT_HEADING,
  },
});
