import { User } from '@prisma/client';

export default interface RequestWithUser extends Request {
  user: User;
}
