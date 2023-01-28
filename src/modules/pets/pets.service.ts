import { Injectable } from '@nestjs/common';

@Injectable()
export class PetsService {
  async findDonations() {
    return 'ok';
  }

  async createDonation(userId, payload) {
    return {
      id: userId,
      payload,
    };
  }
}
