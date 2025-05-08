import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './auth/reducers';
import userReducer from './user/reducers';
import vehicleReducer from './vehicle/reducers';
import requestReducer from './request/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  vehicle: vehicleReducer,
  request: requestReducer,
});

export default rootReducer;
