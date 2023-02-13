import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://www.cepaberto.com/api/v3',
  headers: {
    Authorization: `Token token=${process.env.CEP_ABERTO_TOKEN}`,
  },
});
