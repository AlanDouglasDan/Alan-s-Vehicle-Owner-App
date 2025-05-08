import {apiCall} from '../index';

export const getRequests = (): Promise<any> =>
  apiCall({method: 'get', url: '/request'});

export const createRequest = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/request', data});

export const updateRequest = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/request', data});

export const getBids = (): Promise<any> =>
  apiCall({method: 'get', url: '/bid'});

export const updateBidStatus = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/bid/status', data});

export const scheduleAppointment = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/bid/schedule', data});

export const getAdditionalRepair = (id: string): Promise<any> =>
  apiCall({method: 'get', url: `/additional-repair/${id}`});

export const updateAdditionalRepairStatus = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/additional-repair/status', data});

export const scheduleAdditionalRepairAppointment = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/additional-repair/schedule', data});

export const getRepairHistory = (id: string): Promise<any> =>
  apiCall({method: 'get', url: `/bid/repairs/${id}`});

export const createPaymentIntent = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/payment/intent', data});

export const savePayment = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/payment/pay', data});
