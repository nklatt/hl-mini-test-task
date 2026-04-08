import type { Metadata } from "next";

import type { RadioOption } from "@/hl-common/entities/Cards";
import type { card_interaction_type } from "@/hl-common/PrismaEnums";
import idOrNotFound from "@/utils/api/idOrNotFound";
import { serverSide } from "@/utils/api/server";

import EditCardForm from "./EditCardForm";

export async function generateMetadata(props: {
  params: Promise<{ course_id: string; module_id: string; card_id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);
  const moduleId = idOrNotFound(params.module_id);
  const cardId = idOrNotFound(params.card_id);
  const { data: card } = await serverSide.getCard({ params: { courseId, moduleId, cardId } });
  return { title: `Edit: ${card.title}` };
}

export default async function AdminEditCardPage(props: {
  params: Promise<{ course_id: string; module_id: string; card_id: string }>;
}) {
  const params = await props.params;
  const courseId = idOrNotFound(params.course_id);
  const moduleId = idOrNotFound(params.module_id);
  const cardId = idOrNotFound(params.card_id);

  const { data: card } = await serverSide.getCard({ params: { courseId, moduleId, cardId } });

  return (
    <EditCardForm
      courseId={courseId}
      moduleId={moduleId}
      cardId={cardId}
      current={{
        title: card.title,
        body: card.body,
        interaction_type: card.interaction_type as card_interaction_type,
        options: card.options as RadioOption[] | null,
        order: card.order,
      }}
    />
  );
}
