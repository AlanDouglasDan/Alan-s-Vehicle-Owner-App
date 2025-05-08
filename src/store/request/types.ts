export interface RequestState {
  loading: boolean;
  loading2: boolean;
  error: boolean | string;
  requests?: any[];
  bids?: any[];
}

export interface RequestHookReturn extends RequestState {
  setError: (error: boolean | string) => void;
  createRequest: (data: any) => any;
  updateRequest: (data: any) => any;
  getRequests: () => any;
  getBids: () => any;
  updateBidStatus: (data: any) => any;
  scheduleAppointment: (data: any) => any;
  getAdditionalRepair: (id: string) => any;
  getRepairHistory: (id: string) => any;
  updateAdditionalRepairStatus: (data: any) => any;
  scheduleAdditionalRepairAppointment: (data: any) => any;
  createPaymentIntent: (data: any) => any;
  savePayment: (data: any) => any;
}
