import { redirect } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s · Admin · Mini HealthLearn",
    default: "Admin · Mini HealthLearn",
  },
};

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
