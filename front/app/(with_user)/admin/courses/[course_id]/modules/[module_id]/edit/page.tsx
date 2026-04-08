import type { Metadata } from "next";

import idOrNotFound from "@/utils/api/idOrNotFound";
import { serverSide } from "@/utils/api/server";

import EditModuleForm from "./EditModuleForm";

export async function generateMetadata(props: {
  params: Promise<{ course_id: string; module_id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);
  const moduleId = idOrNotFound(params.module_id);
  const { data: module } = await serverSide.getModule({ params: { courseId, moduleId } });
  return { title: `Edit: ${module.title}` };
}

export default async function AdminEditModulePage(props: {
  params: Promise<{ course_id: string; module_id: string }>;
}) {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);
  const moduleId = idOrNotFound(params.module_id);

  const { data: module } = await serverSide.getModule({ params: { courseId, moduleId } });

  return (
    <EditModuleForm
      courseId={courseId}
      moduleId={moduleId}
      current={{ title: module.title, order: module.order }}
    />
  );
}
