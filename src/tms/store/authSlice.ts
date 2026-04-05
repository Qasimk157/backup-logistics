import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

// Note: We're using Redux Toolkit's createSlice which uses immer internally.
// Redux Toolkit is not in package.json, so we'll use vanilla Redux.
// Actually, let's use a simple reducer pattern compatible with the installed redux package.

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Action types
export const AUTH_LOGIN = 'auth/login';
export const AUTH_LOGOUT = 'auth/logout';

// Action creators
export const loginAction = (user: User, token: string) => ({
  type: AUTH_LOGIN as typeof AUTH_LOGIN,
  payload: { user, token },
});

export const logoutAction = () => ({
  type: AUTH_LOGOUT as typeof AUTH_LOGOUT,
});

type AuthAction =
  | { type: typeof AUTH_LOGIN; payload: { user: User; token: string } }
  | { type: typeof AUTH_LOGOUT };

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case AUTH_LOGOUT:
      localStorage.removeItem('token');
      return initialState;
    default:
      return state;
  }
};
