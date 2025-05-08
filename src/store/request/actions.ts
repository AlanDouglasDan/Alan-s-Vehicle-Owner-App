import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {
  createRequest as createRequestApi,
  updateRequest as updateRequestApi,
  getRequests as getRequestsApi,
  getBids as getBidsApi,
  updateBidStatus as updateBidStatusApi,
  scheduleAppointment as scheduleAppointmentApi,
  getAdditionalRepair as getAdditionalRepairApi,
  getRepairHistory as getRepairHistoryApi,
  updateAdditionalRepairStatus as updateAdditionalRepairStatusApi,
  scheduleAdditionalRepairAppointment as scheduleAdditionalRepairAppointmentApi,
  createPaymentIntent as createPaymentIntentApi,
  savePayment as savePaymentApi,
} from '@http/request';

const SET_ERROR = 'request/SET_ERROR';
const CREATE_REQUEST = 'request/CREATE_REQUEST';
const UPDATE_REQUEST = 'request/UPDATE_REQUEST';
const GET_REQUESTS = 'request/GET_REQUESTS';
const GET_BIDS = 'BID/GET_BID';
const UPDATE_BID_STATUS = 'BID/UPDATE_BID_STATUS';
const SCHEDULE_APPOINTMENT = 'BID/SCHEDULE_APPOINTMENT';
const GET_ADDITIONAL_REPAIR = 'BID/GET_ADDITIONAL_REPAIR';
const GET_REPAIR_HISTORY = 'BID/GET_REPAIR_HISTORY';
const UPDATE_ADDITIONAL_REPAIR_STATUS = 'BID/UPDATE_ADDITIONAL_REPAIR_STATUS';
const SCHEDULE_ADDITIONAL_REPAIR_APPOINTMENT =
  'BID/SCHEDULE_ADDITIONAL_REPAIR_APPOINTMENT';
const CREATE_PAYMENT_INTENT = 'PAYMENT/CREATE_PAYMENT_INTENT';
const SAVE_PAYMENT = 'PAYMENT/SAVE_PAYMENT';

export const setError = createAction<boolean | string>(SET_ERROR);

export const createRequest = createAsyncThunk<any>(
  CREATE_REQUEST,
  async data => {
    const res = await createRequestApi(data);

    return res;
  },
);

export const updateRequest = createAsyncThunk<any>(
  UPDATE_REQUEST,
  async data => {
    const res = await updateRequestApi(data);

    return res;
  },
);

export const getRequests = createAsyncThunk<any>(GET_REQUESTS, async () => {
  const requests = await getRequestsApi();

  return requests;
});

export const getBids = createAsyncThunk<any>(GET_BIDS, async () => {
  const bids = await getBidsApi();

  return bids;
});

export const updateBidStatus = createAsyncThunk<any>(
  UPDATE_BID_STATUS,
  async data => {
    const bids = await updateBidStatusApi(data);

    return bids;
  },
);

export const scheduleAppointment = createAsyncThunk<any>(
  SCHEDULE_APPOINTMENT,
  async data => {
    const bids = await scheduleAppointmentApi(data);

    return bids;
  },
);

export const getAdditionalRepair = createAsyncThunk<any, string>(
  GET_ADDITIONAL_REPAIR,
  async id => {
    const repair = await getAdditionalRepairApi(id);

    return repair;
  },
);

export const getRepairHistory = createAsyncThunk<any, string>(
  GET_REPAIR_HISTORY,
  async id => {
    const history = await getRepairHistoryApi(id);

    return history;
  },
);

export const updateAdditionalRepairStatus = createAsyncThunk<any>(
  UPDATE_ADDITIONAL_REPAIR_STATUS,
  async data => {
    const repair = await updateAdditionalRepairStatusApi(data);

    return repair;
  },
);

export const scheduleAdditionalRepairAppointment = createAsyncThunk<any>(
  SCHEDULE_ADDITIONAL_REPAIR_APPOINTMENT,
  async data => {
    const repair = await scheduleAdditionalRepairAppointmentApi(data);

    return repair;
  },
);

export const createPaymentIntent = createAsyncThunk<any>(
  CREATE_PAYMENT_INTENT,
  async data => {
    const payment = await createPaymentIntentApi(data);

    return payment;
  },
);

export const savePayment = createAsyncThunk<any>(SAVE_PAYMENT, async data => {
  const payment = await savePaymentApi(data);
  return payment;
});
