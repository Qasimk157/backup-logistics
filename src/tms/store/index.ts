import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer, AuthState } from './authSlice';
import { tmsReducer, TmsState } from './tmsSlice';

export interface RootState {
  auth: AuthState;
  tms: TmsState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  tms: tmsReducer,
});

const persistConfig = {
  key: 'backup-logistics',
  storage,
  whitelist: ['auth'], // Only persist auth state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
