import window from '@react-navigation/native/lib/typescript/src/__mocks__/window';

const PROTOCOL = window.location.protocol;
const HOSTNAME = window.location.hostname;
const PORT = 8080;

export const IP_URL = 'http://192.168.1.21';

const REVERSE_PROXY_URL = `${PROTOCOL}//${HOSTNAME}:${PORT}`;
const BACKEND_URL_CONST = `${REVERSE_PROXY_URL}/api/v1`;

export const enviroment = {
  production: true,
  REVERSE_PROXY_URL: REVERSE_PROXY_URL,
  BACKEND_URL: BACKEND_URL_CONST,
};
