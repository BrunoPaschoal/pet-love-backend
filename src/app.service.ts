import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  itsRunning(): string {
    return 'API is running on port 3000!';
  }
}
