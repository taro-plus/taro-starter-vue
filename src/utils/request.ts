import { checkToken, getToken, removeToken } from '@/utils';
import type { Chain, RequestTask } from '@tarojs/taro';
import {
  addInterceptor,
  getCurrentInstance,
  hideLoading,
  reLaunch,
  request as http,
  showLoading as openLoading,
  showToast,
} from '@tarojs/taro';
import qs from 'qs';

export const loginPageUrl = '/pages/login/index';

export const redirectToLoginPage = () => {
  removeToken();

  reLaunch({
    url: loginPageUrl,
  });
};

export interface Response {
  /** 消息状态码 */
  code: number;
  /** 数据对象 */
  data?: any;
  /** 消息内容 */
  msg: string;
}

export interface FullRequestParams extends Omit<Parameters<typeof http>[0], 'url'> {
  secure?: boolean;
  skipErrorHandler?: boolean;
  showLoading?: boolean;
  path: string;
  query?: Record<string, any>;
  body?: Record<string, any>;
  requestType?: 'form';
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path' | 'skipErrorHandler'>;

export function request<T extends Response>(
  options: {
    skipErrorHandler: true;
  } & Omit<FullRequestParams, 'skipErrorHandler'>,
): RequestTask<T>;
export function request<T extends Response>(
  options: {
    skipErrorHandler?: false;
  } & Omit<FullRequestParams, 'skipErrorHandler'>,
): Promise<T['data']>;
export async function request<T extends Response>(options: FullRequestParams) {
  return new Promise((resolve, reject) => {
    const { secure = true, skipErrorHandler = false, showLoading = true, path, query, body, ...restOptions } = options;

    if (secure && !checkToken()) {
      reject(new Error(`接口${path}未通过鉴权校验`));
      return;
    }

    if (showLoading) {
      openLoading();
    }

    http<T>({
      url: query ? `${CONST_API_HOST}${path}?${qs.stringify(query)}` : `${CONST_API_HOST}${path}`,
      data: body,
      ...restOptions,
    })
      .then((result) => {
        if (showLoading) {
          hideLoading();
        }

        if (skipErrorHandler) {
          resolve(result);
          return;
        }

        const {
          data: { data: resData, code: resCode, msg: title = '网络繁忙，请稍后再试' },
        } = result;

        if (resCode === 200) {
          resolve(resData);
          return;
        }

        if (resCode === 401 && getCurrentInstance()?.router?.path !== loginPageUrl) {
          redirectToLoginPage();
        } else {
          showToast({
            title,
            icon: 'none',
            duration: 3000,
          });
        }

        reject(result);
      })
      .catch((error) => {
        if (showLoading) {
          hideLoading();
        }

        reject(error);
      });
  });
}

export function tokenInterceptor(chain: Chain) {
  const { header = {}, ...restParams } = chain.requestParams;

  if (checkToken()) {
    header.Authorization = `Bearer ${getToken()}`;
  }

  return chain.proceed({
    ...restParams,
    header,
  });
}

addInterceptor(tokenInterceptor);
