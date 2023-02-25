import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro';

export const setToken = (token: string) => {
  setStorageSync(CONST_TOKEN_KEY, token);
};

export const getToken = () => {
  return getStorageSync(CONST_TOKEN_KEY);
};

export const removeToken = () => {
  return removeStorageSync(CONST_TOKEN_KEY);
};

export const checkToken = () => {
  return getToken() !== '';
};
