import type { Metadata } from "next";

import idOrNotFound from "@/utils/api/idOrNotFound";
import { serverSide } from "@/utils/api/server";

import EditCourseForm from "./EditCourseForm";

export async function generateMetadata(props: {
  params: Promise<{ course_id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);
  const { data: course } = await serverSide.getCourse({ params: { courseId } });
  return { title: `Edit: ${course.title}` };
}

export default async function AdminEditCoursePage(props: {
  params: Promise<{ course_id: string }>;
}) {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);

  const { data: course } = await serverSide.getCourse({ params: { courseId } });

  return (
    <EditCourseForm
      courseId={courseId}
      current={{ title: course.title, description: course.description ?? "" }}
    />
  );
}
