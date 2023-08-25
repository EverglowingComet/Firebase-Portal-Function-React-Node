import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'store/user';
import commonReducer from 'store/common';

export default configureStore({
  reducer: {
    auth: userReducer,
    common: commonReducer,
  },
})