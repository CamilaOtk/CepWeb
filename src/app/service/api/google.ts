import axios from 'axios';

const http = axios.create({
  baseURL:
    'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBY6hVL86DLkp1pYR7MgJbL3lkY-bBhTM4&v=3.exp&libraries=geometry,drawing,places',
});

export const searchZipCode = async (code: any) =>
  http.get(`&address=${code}&sensor=false`);

export const searchAddress = async (address: any, loc: any) =>
  http.get(`&address=${address}${loc}&sensor=false`);

export const searchNumber = async (address: any, number: any, loc: any) =>
  http.get(`&address=${address}${number}, ${loc}&sensor=false`);

export default {
  http,
  searchZipCode,
  searchAddress,
  searchNumber,
};
