import type { UserRole } from '../../../shared/db/entity/User/user.ts';

export interface IPublicUserDTO {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isPaippaVerified: boolean;
}


