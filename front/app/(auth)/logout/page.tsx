"use client";

import { useEffect } from "react";

import { H3 } from "@/components/Headings";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import { logout } from "@/utils/api/client";
import { useRequest } from "@/utils/useRequest";

export default function LogoutPage() {
  const { error, run } = useRequest<typeof logout>();

  useEffect(() => {
    run(logout(), () => {
      window.location.href = "/login";
    });
  }, [run]);

  return (
    <>
      {error ? (
        <Message error>{error}</Message>
      ) : (
        <H3 className="text-center">
          Logging out
          <span className="ml-3">
            <Loader inline small />
          </span>
        </H3>
      )}
    </>
  );
}
