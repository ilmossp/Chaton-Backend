import { User } from '@prisma/client';

export class CreateRequestDto {
  from: User;
  to: User;
}
