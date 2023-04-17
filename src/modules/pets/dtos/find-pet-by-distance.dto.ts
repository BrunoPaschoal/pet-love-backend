export type FindPetDonationsDto = {
  page: string;
  perPage: string;
  sizeFilter?: string;
  stateFilter?: string;
  cityIbgeCodeFilter?: string;
  sexFilter?: string;
  ageFilter?: string;
  ageTypeFilter: string;
  orderBy?: 'DESC' | 'ASC';
};
