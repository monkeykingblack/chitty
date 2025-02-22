import axios from 'axios';

import { BACKEND_URL } from '.';
import { HttpError } from '../libs/http-error';

export function createAxios() {
  const instance = axios.create({
    baseURL: BACKEND_URL + '/api',
  });

  instance.interceptors.response.use(
    (res) => res,
    (e) => {
      const { data, status } = e?.response || {};
      throw new HttpError(
        data || e?.message || 'no response from server',
        status || 500,
      );
    },
  );

  return instance;
}
