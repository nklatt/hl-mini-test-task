import type {
  CardEntity,
  CreateCardBody,
  UpdateCardBody,
} from "../entities/Cards";
import type { CourseEntity, CourseSummaryEntity } from "../entities/Courses";
import type {
  CardSubmitEventEntity,
  IngestEventBody,
} from "../entities/Events";
import type { ModuleEntity } from "../entities/Modules";
import type { UserEntity } from "../entities/Users";
import type { ApiRes, ApiResArray, ApiResSuccess } from "./Response";

export namespace API {
  export namespace sendOtp {
    export type body = { phone: string };
    export type resp = Promise<ApiRes<{ success: boolean }>>;
    export type func = (args: { body: body }) => resp;
  }

  export namespace verifyOtp {
    export type body = { phone: string; otp: string };
    export type resp = Promise<
      ApiRes<{ user: UserEntity; needsRegistration: boolean }>
    >;
    export type func = (args: { body: body }) => resp;
  }

  export namespace register {
    export type body = { first: string; last: string };
    export type resp = Promise<ApiRes<UserEntity>>;
    export type func = (args: { body: body }) => resp;
  }

  export namespace logout {
    export type resp = Promise<ApiResSuccess>;
    export type func = () => resp;
  }

  export namespace getMe {
    export type resp = Promise<ApiRes<UserEntity>>;
    export type func = () => resp;
  }

  export namespace getCourses {
    export type resp = Promise<ApiResArray<CourseSummaryEntity>>;
    export type func = () => resp;
  }

  export namespace getCourse {
    export type params = { courseId: number };
    export type resp = Promise<ApiRes<CourseEntity>>;
    export type func = (args: { params: params }) => resp;
  }

  export namespace createCourse {
    export type body = { title: string; description?: string };
    export type resp = Promise<ApiRes<CourseSummaryEntity>>;
    export type func = (args: { body: body }) => resp;
  }

  export namespace updateCourse {
    export type params = { courseId: number };
    export type body = { title?: string; description?: string };
    export type resp = Promise<ApiRes<CourseSummaryEntity>>;
    export type func = (args: { params: params; body: body }) => resp;
  }

  export namespace getModules {
    export type params = { courseId: number };
    export type resp = Promise<ApiResArray<ModuleEntity>>;
    export type func = (args: { params: params }) => resp;
  }

  export namespace getModule {
    export type params = { courseId: number; moduleId: number };
    export type resp = Promise<ApiRes<ModuleEntity>>;
    export type func = (args: { params: params }) => resp;
  }

  export namespace createModule {
    export type params = { courseId: number };
    export type body = { title: string; order: number };
    export type resp = Promise<ApiRes<ModuleEntity>>;
    export type func = (args: { params: params; body: body }) => resp;
  }

  export namespace updateModule {
    export type params = { courseId: number; moduleId: number };
    export type body = { title?: string; order?: number };
    export type resp = Promise<ApiRes<ModuleEntity>>;
    export type func = (args: { params: params; body: body }) => resp;
  }

  export namespace deleteModule {
    export type params = { courseId: number; moduleId: number };
    export type resp = Promise<ApiResSuccess>;
    export type func = (args: { params: params }) => resp;
  }

  export namespace getCards {
    export type params = { courseId: number; moduleId: number };
    export type resp = Promise<ApiResArray<CardEntity>>;
    export type func = (args: { params: params }) => resp;
  }

  export namespace getCard {
    export type params = { courseId: number; moduleId: number; cardId: number };
    export type resp = Promise<ApiRes<CardEntity>>;
    export type func = (args: { params: params }) => resp;
  }

  export namespace createCard {
    export type params = { courseId: number; moduleId: number };
    export type body = CreateCardBody;
    export type resp = Promise<ApiRes<CardEntity>>;
    export type func = (args: { params: params; body: body }) => resp;
  }

  export namespace updateCard {
    export type params = { courseId: number; moduleId: number; cardId: number };
    export type body = UpdateCardBody;
    export type resp = Promise<ApiRes<CardEntity>>;
    export type func = (args: { params: params; body: body }) => resp;
  }

  export namespace deleteCard {
    export type params = { courseId: number; moduleId: number; cardId: number };
    export type resp = Promise<ApiResSuccess>;
    export type func = (args: { params: params }) => resp;
  }

  export namespace ingestEvent {
    export type body = IngestEventBody;
    export type resp = Promise<ApiRes<CardSubmitEventEntity>>;
    export type func = (args: { body: body }) => resp;
  }

  export namespace getModuleEvents {
    export type params = { courseId: number };
    export type resp = Promise<
      ApiRes<{ moduleBeginIds: number[]; moduleCompleteIds: number[] }>
    >;
    export type func = (args: { params: params }) => resp;
  }
}
