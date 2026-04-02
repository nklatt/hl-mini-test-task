import { Delete, Get, Patch, Post, Put } from "@nestjs/common";

import {
  type AccessControl,
  SetAccessControl,
} from "src/authentication/access-control";
import { type Req, Routes } from "src/hl-common/api/routes";

// Searches for the decorated controller method in api/routes, adds the corresponding HTTP method decorator,
// and applies the specified access control strategy for authentication and authorization.
export function Route(accessControl: AccessControl) {
  function decorator<T>(
    target: object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>,
  ): void {
    const req = Routes[propertyKey as keyof typeof Routes] as Req | undefined;
    if (!req) {
      throw new Error(`Invalid @Route: ${propertyKey}`);
    }

    const methodDecorator = getMethodDecorator(req.method)(req.path);
    methodDecorator(target, propertyKey, descriptor);

    const accessControlDecorator = SetAccessControl(accessControl);
    accessControlDecorator(target, propertyKey, descriptor);
  }

  return decorator;
}

function getMethodDecorator(method: Req["method"]) {
  switch (method) {
    case "GET":
      return Get;
    case "POST":
      return Post;
    case "PUT":
      return Put;
    case "PATCH":
      return Patch;
    case "DELETE":
      return Delete;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
}
