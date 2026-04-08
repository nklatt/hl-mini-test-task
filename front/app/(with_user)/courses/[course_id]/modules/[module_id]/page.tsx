import type { Metadata } from "next";

import idOrNotFound from "@/utils/api/idOrNotFound";
import { serverSide } from "@/utils/api/server";
import { requireUserTokenFromCookies } from "@/utils/getUserToken";

import ModuleClient from "./ModuleClient";

export async function generateMetadata(props: {
  params: Promise<{ course_id: string; module_id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);
  const moduleId = idOrNotFound(params.module_id);
  const { data: module } = await serverSide.getModule({ params: { courseId, moduleId } });
  return { title: module.title };
}

export default async function ModulePage(props: {
  params: Promise<{ course_id: string; module_id: string }>;
}) {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);
  const moduleId = idOrNotFound(params.module_id);
  const userToken = await requireUserTokenFromCookies();

  // Fetch module with cards
  const { data: module } = await serverSide.getModule({
    params: { courseId, moduleId },
  });

  return (
    <ModuleClient
      module={{ ...module, cards: module.cards ?? [] }}
      courseId={courseId}
      userId={userToken.id}
    />
  );
}
