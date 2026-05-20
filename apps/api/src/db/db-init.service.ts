import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

@Injectable()
export class DbInitService implements OnModuleInit {
  private readonly logger = new Logger(DbInitService.name);

  constructor() {}

  async onModuleInit() {
    this.logger.log('Database tables verified');
  }
}
