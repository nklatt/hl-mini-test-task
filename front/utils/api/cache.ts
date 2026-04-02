import { cache } from "react";

import idOrNotFound from "./idOrNotFound";
import { serverSide } from "./server";

export namespace cached {
  export const getCourses = cache(async () => {
    return (await serverSide.getCourses()).data;
  });

  export const getCourse = cache(async (params: { course_id: string }) => {
    const courseId = idOrNotFound(params.course_id);
    return (await serverSide.getCourse({ params: { courseId } })).data;
  });

  export const getModules = cache(async (params: { course_id: string }) => {
    const courseId = idOrNotFound(params.course_id);
    return (await serverSide.getModules({ params: { courseId } })).data;
  });

  export const getModule = cache(
    async (params: { course_id: string; module_id: string }) => {
      const courseId = idOrNotFound(params.course_id);
      const moduleId = idOrNotFound(params.module_id);
      return (await serverSide.getModule({ params: { courseId, moduleId } }))
        .data;
    },
  );

  export const getCards = cache(
    async (params: { course_id: string; module_id: string }) => {
      const courseId = idOrNotFound(params.course_id);
      const moduleId = idOrNotFound(params.module_id);
      return (await serverSide.getCards({ params: { courseId, moduleId } }))
        .data;
    },
  );

  export const getCard = cache(
    async (params: {
      course_id: string;
      module_id: string;
      card_id: string;
    }) => {
      const courseId = idOrNotFound(params.course_id);
      const moduleId = idOrNotFound(params.module_id);
      const cardId = idOrNotFound(params.card_id);
      return (
        await serverSide.getCard({ params: { courseId, moduleId, cardId } })
      ).data;
    },
  );
}
