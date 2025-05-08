import {ActionReducerMapBuilder, createSlice, isAnyOf} from '@reduxjs/toolkit';

import {VehicleState} from './types';
import {
  setError,
  createVehicle,
  editVehicle,
  addVehicleImage,
  getVehicles,
  getServices,
  deleteVehicle,
} from './actions';

const initialState: VehicleState = {
  loading: false,
  //   loading2: false,
  error: false,
  vehicles: undefined,
  services: undefined,
};

const businessStore = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<VehicleState>) => {
    builder.addCase(setError, (state, {payload}) => {
      state.error = payload;
    });

    builder.addCase(getVehicles.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.vehicles = payload.data;
    });

    builder.addCase(getServices.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.services = payload.data;
    });

    builder.addMatcher(
      isAnyOf(
        createVehicle.fulfilled,
        editVehicle.fulfilled,
        addVehicleImage.fulfilled,
        deleteVehicle.fulfilled,
      ),
      state => {
        state.loading = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        createVehicle.pending,
        editVehicle.pending,
        addVehicleImage.pending,
        getVehicles.pending,
        getServices.pending,
        deleteVehicle.pending,
      ),
      state => {
        state.loading = true;
        state.error = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        createVehicle.rejected,
        editVehicle.rejected,
        addVehicleImage.rejected,
        getVehicles.rejected,
        getServices.rejected,
        deleteVehicle.rejected,
      ),
      (state, {error}) => {
        state.loading = false;
        state.error = error?.message || true;
      },
    );
  },
});

export default businessStore.reducer;
