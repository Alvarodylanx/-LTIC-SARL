import { Controller } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { UsersService } from './users.service';

@SkipThrottle({ login: true, form: true })
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
}
