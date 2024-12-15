import { Role } from '@users/domain/value-object/role';

declare type TokenPayload = {
  id: string;
  role: Role;
};
