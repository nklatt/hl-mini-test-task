import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { role } from "@/hl-common/PrismaEnums";

import { requireUserTokenFromCookies } from "@/utils/getUserToken";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userToken = await requireUserTokenFromCookies();

  if (userToken.role !== role.admin) {
    redirect("/courses");
  }

  return <>{children}</>;
}
