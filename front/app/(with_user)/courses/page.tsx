import { ButtonLink } from "@/components/ButtonLink";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import { serverSide } from "@/utils/api/server";

export default async function CoursesPage() {
  const { data: courses } = await serverSide.getCourses();

  return (
    <div>
      <H2 className="mb-4">Courses</H2>
      {courses.length === 0 && (
        <Panel>
          <p className="text-gray-500">No courses available yet.</p>
        </Panel>
      )}
      <div className="space-y-4">
        {courses.map((course) => (
          <Panel key={course.id} title={course.title}>
            {course.description && (
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
            )}
            <ButtonLink href={`/courses/${course.id}`} medium inline>
              Start Course
            </ButtonLink>
          </Panel>
        ))}
      </div>
    </div>
  );
}
