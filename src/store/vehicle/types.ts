export interface VehicleState {
  loading: boolean;
  //   loading2: boolean;
  error: boolean | string;
  vehicles?: any[];
  services?: any[];
}

export interface VehicleHookReturn extends VehicleState {
  setError: (error: boolean | string) => void;
  createVehicle: (data: any) => any;
  editVehicle: (data: any) => any;
  addVehicleImage: (data: FormData) => any;
  getVehicles: () => any;
  getServices: () => any;
  deleteVehicle: (id: string) => any;
}
