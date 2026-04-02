import { ButtonLink } from "@/components/ButtonLink";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import { serverSide } from "@/utils/api/server";

export default async function AdminCoursesPage() {
  const { data: courses } = await serverSide.getCourses();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <H2>Courses</H2>
        <ButtonLink href="/admin/courses/create" medium inline>
          + New Course
        </ButtonLink>
      </div>
      {courses.length === 0 && (
        <Panel>
          <p className="text-gray-500">No courses yet.</p>
        </Panel>
      )}
      <div className="space-y-3">
        {courses.map((course) => (
          <Panel key={course.id} tight>
            <div className="flex items-center justify-between">
              <span className="font-semibold">{course.title}</span>
              <div className="flex gap-2">
                <ButtonLink
                  href={`/admin/courses/${course.id}/edit`}
                  medium
                  inline
                  secondary
                >
                  Edit
                </ButtonLink>
                <ButtonLink
                  href={`/admin/courses/${course.id}/modules`}
                  medium
                  inline
                >
                  Modules
                </ButtonLink>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
