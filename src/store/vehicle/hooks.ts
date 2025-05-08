import {shallowEqual, useSelector} from 'react-redux';

import {useActionCreator} from 'hooks';
import {RootState} from 'store/types';
import {VehicleHookReturn} from './types';
import {
  setError,
  createVehicle,
  editVehicle,
  addVehicleImage,
  getVehicles,
  getServices,
  deleteVehicle,
} from './actions';

export const useVehicle = (): VehicleHookReturn => {
  const vehicleState = useSelector(
    (state: RootState) => state.vehicle,
    shallowEqual,
  );

  return {
    ...vehicleState,
    setError: useActionCreator(setError),
    createVehicle: useActionCreator(createVehicle),
    editVehicle: useActionCreator(editVehicle),
    addVehicleImage: useActionCreator(addVehicleImage),
    getVehicles: useActionCreator(getVehicles),
    getServices: useActionCreator(getServices),
    deleteVehicle: useActionCreator(deleteVehicle),
  };
};
