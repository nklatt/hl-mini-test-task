import { SetMetadata } from "@nestjs/common";
import type { role } from "@prisma/client";

import { roleHasPrivilege } from "src/hl-common/api/roles";
import type { UserTokenV2 } from "src/hl-common/api/UserToken";

export const AccessControlKey = "authentication-access-control";

export interface AccessControl {
  canActivate(
    user: UserTokenV2 | null,
    params?: Record<string, string>,
  ): boolean;
}

export class PublicAccess implements AccessControl {
  canActivate(): boolean {
    return true;
  }
}

export class RequiresPrivilegeAccess implements AccessControl {
  constructor(private readonly requiredRole: role) {}

  canActivate(
    user: UserTokenV2 | null,
    _params?: Record<string, string>,
  ): boolean {
    return !!user?.role && roleHasPrivilege(user.role, this.requiredRole);
  }
}

export const Public = () => new PublicAccess();

export const RequiresPrivilege = (requiredRole: role) =>
  new RequiresPrivilegeAccess(requiredRole);

export const SetAccessControl = (accessControl: AccessControl) =>
  SetMetadata(AccessControlKey, accessControl);
