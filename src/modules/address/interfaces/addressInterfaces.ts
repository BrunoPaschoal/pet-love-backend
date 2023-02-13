type AxiosCityResponse = {
  ddd: number;
  ibge: string;
  nome: string;
};
type AxiosStateResponse = {
  sigla: string;
};

export type CepExternalConsultResponse = {
  altitude: number;
  cep: string;
  latitude: string;
  longitude: string;
  logradouro: string;
  bairro: string;
  cidade: AxiosCityResponse;
  estado: AxiosStateResponse;
};

export type ConsultAddressByCepResponse = {
  city: string;
  state: string;
  district: string;
  street: string;
  cep: string;
  latitude: number;
  longitude: number;
  cityIbgeCode: string;
};
