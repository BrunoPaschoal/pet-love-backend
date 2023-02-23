export type FindPetDonationsDto = {
  userId: string;
  page: string;
  perPage: string;
  sizeFilter?: string;
  stateFilter?: string;
  cityIbgeCodeFilter?: string;
  sexFilter?: string;
  ageFilter?: string;
  ageTypeFilter: string;
};
