/// Biblioteca que faz, trata e facilita requisições HTTTP e HTTPS (ApisRestful e XML)
import axios from 'axios';
/// são variaveis de ambiente
import { environment } from 'src/environments/environment';

/// criando um padrão de requisição
export const http = axios.create({});

http.interceptors.response.use(
  (response) => response,
  (response) => Promise.reject(response)
);

export const requets = async (
  type: string,
  requestUrl: string,
  model?: any,
  config?: any
) => {
    
  try {
    switch (type) {
      case 'get': {
        return await http.get(requestUrl, config);
      }
      case 'post': {
        return await http.post(requestUrl, model, config);
      }
      case 'put': {
        return await http.put(requestUrl, model, config);
      }
      case 'delete': {
        return await http.delete(requestUrl, config);
      }
      case 'patch': {
        return await http.patch(requestUrl, model, config);
      }
      default: {
        return null;
      }
    }
  } catch (err) {
    console.error('erro', err);
    throw null;
  }
};

export default {
  get: (url: string, confi?: any) => requets('get', url, null, confi),
  post: (url: string, model: any, confi?: any) =>
    requets('post', url, model, confi),
  put: (url: string, model: any, confi?: any) =>
    requets('put', url, model, confi),
  delete: (url: string, confi?: any) => requets('delete', url, null, confi),
  patch: (url: string, model: any, confi?: any) =>
    requets('patch', url, model, confi),
};
