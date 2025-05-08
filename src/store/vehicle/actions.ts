import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {
  createVehicle as createVehicleApi,
  editVehicle as editVehicleApi,
  addVehicleImage as addVehicleImageApi,
  getVehicles as getVehiclesApi,
  getServices as getServicesApi,
  deleteVehicle as deleteVehicleApi,
} from '@http/vehicle';

const SET_ERROR = 'vehicle/SET_ERROR';
const CREATE_VEHICLE = 'vehicle/CREATE_VEHICLE';
const EDIT_VEHICLE = 'vehicle/EDIT_VEHICLE';
const ADD_VEHICLE = 'vehicle/ADD_VEHICLE';
const GET_VEHICLES = 'vehicle/GET_VEHICLES';
const GET_SERVICES = 'vehicle/GET_SERVICES';
const DELETE_VEHICLE = 'vehicle/DELETE_VEHICLE';

export const setError = createAction<boolean | string>(SET_ERROR);

export const createVehicle = createAsyncThunk<any>(
  CREATE_VEHICLE,
  async data => {
    const res = await createVehicleApi(data);

    return res;
  },
);

export const editVehicle = createAsyncThunk<any>(EDIT_VEHICLE, async data => {
  const res = await editVehicleApi(data);

  return res;
});

export const addVehicleImage = createAsyncThunk<any, FormData>(
  ADD_VEHICLE,
  async data => {
    const res = await addVehicleImageApi(data);

    return res;
  },
);

export const getVehicles = createAsyncThunk<any>(GET_VEHICLES, async () => {
  const res = await getVehiclesApi();

  return res;
});

export const getServices = createAsyncThunk<any>(GET_SERVICES, async () => {
  const res = await getServicesApi();

  return res;
});

export const deleteVehicle = createAsyncThunk<any, string>(
  DELETE_VEHICLE,
  async data => {
    const res = await deleteVehicleApi(data);

    return res;
  },
);
