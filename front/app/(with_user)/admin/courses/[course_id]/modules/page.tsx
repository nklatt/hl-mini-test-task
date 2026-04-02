import { ButtonLink } from "@/components/ButtonLink";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import idOrNotFound from "@/utils/api/idOrNotFound";
import { serverSide } from "@/utils/api/server";

export default async function AdminModulesPage(props: {
  params: Promise<{ course_id: string }>;
}) {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);

  const { data: modules } = await serverSide.getModules({
    params: { courseId },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <H2>Modules</H2>
        <div className="flex gap-2">
          <ButtonLink
            href={`/admin/courses/${courseId}/edit`}
            medium
            inline
            secondary
          >
            ← Course
          </ButtonLink>
          <ButtonLink
            href={`/admin/courses/${courseId}/modules/create`}
            medium
            inline
          >
            + New Module
          </ButtonLink>
        </div>
      </div>
      {modules.length === 0 && (
        <Panel>
          <p className="text-gray-500">No modules yet.</p>
        </Panel>
      )}
      <div className="space-y-3">
        {modules.map((module) => (
          <Panel key={module.id} tight>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500 mr-2">
                  #{module.order}
                </span>
                <span className="font-semibold">{module.title}</span>
              </div>
              <div className="flex gap-2">
                <ButtonLink
                  href={`/admin/courses/${courseId}/modules/${module.id}/edit`}
                  medium
                  inline
                  secondary
                >
                  Edit
                </ButtonLink>
                <ButtonLink
                  href={`/admin/courses/${courseId}/modules/${module.id}/cards`}
                  medium
                  inline
                >
                  Cards
                </ButtonLink>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
