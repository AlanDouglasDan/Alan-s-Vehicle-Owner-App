import {shallowEqual, useSelector} from 'react-redux';

import {useActionCreator} from 'hooks';
import {RootState} from 'store/types';
import {RequestHookReturn} from './types';
import {
  setError,
  createRequest,
  updateRequest,
  getRequests,
  getBids,
  updateBidStatus,
  scheduleAppointment,
  getAdditionalRepair,
  updateAdditionalRepairStatus,
  scheduleAdditionalRepairAppointment,
  getRepairHistory,
  createPaymentIntent,
  savePayment,
} from './actions';

export const useRequest = (): RequestHookReturn => {
  const requestState = useSelector(
    (state: RootState) => state.request,
    shallowEqual,
  );

  return {
    ...requestState,
    setError: useActionCreator(setError),
    createRequest: useActionCreator(createRequest),
    updateRequest: useActionCreator(updateRequest),
    getRequests: useActionCreator(getRequests),
    getBids: useActionCreator(getBids),
    updateBidStatus: useActionCreator(updateBidStatus),
    scheduleAppointment: useActionCreator(scheduleAppointment),
    getAdditionalRepair: useActionCreator(getAdditionalRepair),
    getRepairHistory: useActionCreator(getRepairHistory),
    updateAdditionalRepairStatus: useActionCreator(
      updateAdditionalRepairStatus,
    ),
    scheduleAdditionalRepairAppointment: useActionCreator(
      scheduleAdditionalRepairAppointment,
    ),
    createPaymentIntent: useActionCreator(createPaymentIntent),
    savePayment: useActionCreator(savePayment),
  };
};
