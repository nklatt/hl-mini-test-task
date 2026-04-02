import { ButtonLink } from "@/components/ButtonLink";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import idOrNotFound from "@/utils/api/idOrNotFound";
import { serverSide } from "@/utils/api/server";

export default async function AdminCardsPage(props: {
  params: Promise<{ course_id: string; module_id: string }>;
}) {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);
  const moduleId = idOrNotFound(params.module_id);

  const { data: cards } = await serverSide.getCards({
    params: { courseId, moduleId },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <H2>Cards</H2>
        <div className="flex gap-2">
          <ButtonLink
            href={`/admin/courses/${courseId}/modules`}
            medium
            inline
            secondary
          >
            ← Modules
          </ButtonLink>
          <ButtonLink
            href={`/admin/courses/${courseId}/modules/${moduleId}/cards/create`}
            medium
            inline
          >
            + New Card
          </ButtonLink>
        </div>
      </div>
      {cards.length === 0 && (
        <Panel>
          <p className="text-gray-500">No cards yet.</p>
        </Panel>
      )}
      <div className="space-y-3">
        {cards.map((card) => (
          <Panel key={card.id} tight>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500 mr-2">
                  #{card.order}
                </span>
                <span className="font-semibold">{card.title}</span>
                <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                  {card.interaction_type}
                </span>
              </div>
              <ButtonLink
                href={`/admin/courses/${courseId}/modules/${moduleId}/cards/${card.id}/edit`}
                small
                inline
                secondary
              >
                Edit
              </ButtonLink>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
