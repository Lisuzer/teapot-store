import { SetMetadata } from '@nestjs/common';
import { UserStatus } from '../schemas/user-status.enum'; 

export const STATUSES_KEY = 'statuses';
export const Status = (...statuses: UserStatus[]) => SetMetadata(STATUSES_KEY, statuses);