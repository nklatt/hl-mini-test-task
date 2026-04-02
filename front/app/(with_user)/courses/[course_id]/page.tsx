import { ButtonLink } from "@/components/ButtonLink";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import idOrNotFound from "@/utils/api/idOrNotFound";
import { serverSide } from "@/utils/api/server";

export default async function CoursePage(props: {
  params: Promise<{ course_id: string }>;
}) {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);
  const [{ data: course }, { data: moduleEvents }] = await Promise.all([
    serverSide.getCourse({ params: { courseId } }),
    serverSide.getModuleEvents({ params: { courseId } }),
  ]);

  const beginSet = new Set(moduleEvents.moduleBeginIds);
  const completeSet = new Set(moduleEvents.moduleCompleteIds);

  const getStatus = (moduleId: number) => {
    if (completeSet.has(moduleId)) return "complete";
    if (beginSet.has(moduleId)) return "in progress";
    return "not started";
  };

  const statusClass = (status: string) => {
    if (status === "complete") return "bg-green-100 text-green-800";
    if (status === "in progress") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div>
      <H2 className="mb-2">{course.title}</H2>
      {course.description && (
        <p className="text-gray-600 mb-6">{course.description}</p>
      )}
      <div className="space-y-3">
        {course.modules.map((module, idx) => {
          const status = getStatus(module.id);
          return (
            <Panel key={module.id} tight>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 mr-2">
                    Module {idx + 1}
                  </span>
                  <span className="font-semibold">{module.title}</span>
                  <span
                    className={`ml-3 text-xs px-2 py-0.5 rounded-full font-medium ${statusClass(status)}`}
                  >
                    {status}
                  </span>
                </div>
                {status !== "complete" && (
                  <ButtonLink
                    href={`/courses/${courseId}/modules/${module.id}`}
                    medium
                    inline
                  >
                    {status === "in progress" ? "Continue" : "Start"}
                  </ButtonLink>
                )}
              </div>
            </Panel>
          );
        })}
        {course.modules.length === 0 && (
          <Panel>
            <p className="text-gray-500">No modules in this course yet.</p>
          </Panel>
        )}
      </div>
    </div>
  );
}
