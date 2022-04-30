import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './Filter/slice';
import {contactsApi} from './Contacts/api';


export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});


