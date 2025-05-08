import {StyleSheet} from 'react-native';

import {palette} from './palette';

export const common = StyleSheet.create({
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexedRowStart: {
    flexDirection: 'row',
  },
  spacedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centeredColumn: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  container: {
    borderWidth: 1,
    borderColor: palette.NEUTRAL30,
    padding: 16,
    borderRadius: 15,
  },
  shadow: {
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  line: {
    height: 1,
    backgroundColor: palette.NEUTRAL40,
    marginVertical: 16,
    opacity: 0.25,
  },
});
