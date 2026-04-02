// Routes map method names to their HTTP method and path.
// The @Route decorator uses this to automatically wire up NestJS routes.

export type Req = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  canRetry?: boolean;
};

export namespace Routes {
  export const sendOtp: Req = {
    method: "POST",
    path: "/auth/otp-send",
  };

  export const verifyOtp: Req = {
    method: "POST",
    path: "/auth/otp-verify",
  };

  export const register: Req = {
    method: "POST",
    path: "/auth/register",
  };

  export const logout: Req = {
    method: "POST",
    path: "/auth/logout",
  };

  export const getMe: Req = {
    method: "GET",
    path: "/users/me",
  };

  export const getCourses: Req = {
    method: "GET",
    path: "/courses",
  };

  export const getCourse: Req = {
    method: "GET",
    path: "/courses/:courseId",
  };

  export const createCourse: Req = {
    method: "POST",
    path: "/courses",
  };

  export const updateCourse: Req = {
    method: "PATCH",
    path: "/courses/:courseId",
  };

  export const getModules: Req = {
    method: "GET",
    path: "/courses/:courseId/modules",
  };

  export const getModule: Req = {
    method: "GET",
    path: "/courses/:courseId/modules/:moduleId",
  };

  export const createModule: Req = {
    method: "POST",
    path: "/courses/:courseId/modules",
  };

  export const updateModule: Req = {
    method: "PATCH",
    path: "/courses/:courseId/modules/:moduleId",
  };

  export const deleteModule: Req = {
    method: "DELETE",
    path: "/courses/:courseId/modules/:moduleId",
  };

  export const getCards: Req = {
    method: "GET",
    path: "/courses/:courseId/modules/:moduleId/cards",
  };

  export const getCard: Req = {
    method: "GET",
    path: "/courses/:courseId/modules/:moduleId/cards/:cardId",
  };

  export const createCard: Req = {
    method: "POST",
    path: "/courses/:courseId/modules/:moduleId/cards",
  };

  export const updateCard: Req = {
    method: "PATCH",
    path: "/courses/:courseId/modules/:moduleId/cards/:cardId",
  };

  export const deleteCard: Req = {
    method: "DELETE",
    path: "/courses/:courseId/modules/:moduleId/cards/:cardId",
  };

  export const ingestEvent: Req = {
    method: "POST",
    path: "/events",
    canRetry: true,
  };

  export const getModuleEvents: Req = {
    method: "GET",
    path: "/events/courses/:courseId/module-events",
    canRetry: true,
  };
}
