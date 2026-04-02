import { role } from "../PrismaEnums";

type RoleDef = {
  type: role;
};

export const roles: RoleDef[] = [
  { type: role.registered },
  { type: role.admin },
];

export const roleHasPrivilege = (
  userRole: role | undefined | null,
  test: role,
) => {
  if (!userRole) return false;
  const roleIndex = roles.findIndex((r) => r.type === userRole);
  const testIndex = roles.findIndex((r) => r.type === test);
  return roleIndex >= testIndex && roleIndex !== -1 && testIndex !== -1;
};
