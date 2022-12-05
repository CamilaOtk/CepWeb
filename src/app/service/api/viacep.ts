import { environment } from 'src/environments/environment';
import { http } from '../https';

export const searchZipCode = (search: string) =>
  http
    .get(`https://viacep.com.br/ws/${search}/json/`)
    .then((resp) => resp)
    .catch((resp) => {
      return resp?.response ?? resp;
    });
