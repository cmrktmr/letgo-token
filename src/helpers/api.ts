import axios from 'axios';
import { Token } from '../types/types';

const API_URL = 'https://api2.binance.com/api/v3/ticker/24hr';  //.env dosyasına alınacak

export const fetchData = async () => {
  try {
    const response = await axios.get<Token[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
