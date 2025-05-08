import {ActionReducerMapBuilder, createSlice, isAnyOf} from '@reduxjs/toolkit';

import {RequestState} from './types';
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

const initialState: RequestState = {
  loading: false,
  loading2: false,
  error: false,
  requests: undefined,
  bids: undefined,
};

const businessStore = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<RequestState>) => {
    builder.addCase(setError, (state, {payload}) => {
      state.error = payload;
    });

    builder.addCase(getRequests.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.requests = payload.data;
    });

    builder.addCase(getBids.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.bids = payload.data;
    });

    builder.addMatcher(isAnyOf(getAdditionalRepair.fulfilled), state => {
      state.loading2 = false;
    });

    builder.addMatcher(
      isAnyOf(
        createRequest.fulfilled,
        updateRequest.fulfilled,
        updateBidStatus.fulfilled,
        scheduleAppointment.fulfilled,
        updateAdditionalRepairStatus.fulfilled,
        scheduleAdditionalRepairAppointment.fulfilled,
        getRepairHistory.fulfilled,
        createPaymentIntent.fulfilled,
        savePayment.fulfilled,
      ),
      state => {
        state.loading = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        createRequest.pending,
        getRequests.pending,
        updateRequest.pending,
        getBids.pending,
        updateBidStatus.pending,
        scheduleAppointment.pending,
        updateAdditionalRepairStatus.pending,
        scheduleAdditionalRepairAppointment.pending,
        getRepairHistory.pending,
        createPaymentIntent.pending,
        savePayment.pending,
      ),
      state => {
        state.loading = true;
        state.error = false;
      },
    );

    builder.addMatcher(isAnyOf(getAdditionalRepair.pending), state => {
      state.loading2 = true;
      state.error = false;
    });

    builder.addMatcher(
      isAnyOf(
        createRequest.rejected,
        getRequests.rejected,
        updateRequest.rejected,
        getBids.rejected,
        updateBidStatus.rejected,
        scheduleAppointment.rejected,
        getAdditionalRepair.rejected,
        updateAdditionalRepairStatus.rejected,
        scheduleAdditionalRepairAppointment.rejected,
        getRepairHistory.rejected,
        createPaymentIntent.rejected,
        savePayment.rejected,
      ),
      (state, {error}) => {
        state.loading = false;
        state.error = error?.message || true;
      },
    );

    builder.addMatcher(
      isAnyOf(getAdditionalRepair.rejected),
      (state, {error}) => {
        state.loading2 = false;
        state.error = error?.message || true;
      },
    );
  },
});

export default businessStore.reducer;
