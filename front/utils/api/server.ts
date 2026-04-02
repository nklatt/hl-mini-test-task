import { cookies } from "next/headers";

import type { API } from "@/hl-common/api/API";
import { type Req, Routes } from "@/hl-common/api/routes";

import { serverFetch } from "./serverFetch";

const serverFetchDynamic = async <T>(
  req: Req,
  args?: {
    params?: Record<string, any>;
    query?: Record<string, any>;
    body?: any;
  },
) => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("mini-jwt")?.value;
  return serverFetch<T>(req, args, authToken);
};

export namespace serverSide {
  export const getMe: API.getMe.func = async () =>
    serverFetchDynamic(Routes.getMe);

  export const getCourses: API.getCourses.func = async () =>
    serverFetchDynamic(Routes.getCourses);

  export const getCourse: API.getCourse.func = async (args) =>
    serverFetchDynamic(Routes.getCourse, args);

  export const createCourse: API.createCourse.func = async (args) =>
    serverFetchDynamic(Routes.createCourse, args);

  export const updateCourse: API.updateCourse.func = async (args) =>
    serverFetchDynamic(Routes.updateCourse, args);

  export const getModules: API.getModules.func = async (args) =>
    serverFetchDynamic(Routes.getModules, args);

  export const getModule: API.getModule.func = async (args) =>
    serverFetchDynamic(Routes.getModule, args);

  export const createModule: API.createModule.func = async (args) =>
    serverFetchDynamic(Routes.createModule, args);

  export const updateModule: API.updateModule.func = async (args) =>
    serverFetchDynamic(Routes.updateModule, args);

  export const deleteModule: API.deleteModule.func = async (args) =>
    serverFetchDynamic(Routes.deleteModule, args);

  export const getCards: API.getCards.func = async (args) =>
    serverFetchDynamic(Routes.getCards, args);

  export const getCard: API.getCard.func = async (args) =>
    serverFetchDynamic(Routes.getCard, args);

  export const createCard: API.createCard.func = async (args) =>
    serverFetchDynamic(Routes.createCard, args);

  export const updateCard: API.updateCard.func = async (args) =>
    serverFetchDynamic(Routes.updateCard, args);

  export const deleteCard: API.deleteCard.func = async (args) =>
    serverFetchDynamic(Routes.deleteCard, args);

  export const ingestEvent: API.ingestEvent.func = async (args) =>
    serverFetchDynamic(Routes.ingestEvent, args);

  export const getModuleEvents: API.getModuleEvents.func = async (args) =>
    serverFetchDynamic(Routes.getModuleEvents, args);
}
