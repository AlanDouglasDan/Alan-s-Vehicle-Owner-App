import {apiCall} from '../index';

export const getVehicles = (): Promise<any> =>
  apiCall({method: 'get', url: '/vehicle'});

export const createVehicle = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/vehicle', data});

export const editVehicle = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/vehicle', data});

export const addVehicleImage = (data: FormData): Promise<any> =>
  apiCall({method: 'post', url: '/vehicle/images', data});

export const getServices = (): Promise<any> =>
  apiCall({method: 'get', url: '/service'});

export const vinLookup = (vin: string): Promise<any> =>
  apiCall({method: 'get', url: `/car/vinlookup?vin=${vin}`});

export const deleteVehicle = (id: string): Promise<any> =>
  apiCall({method: 'delete', url: '/vehicle/', data: {id}});
