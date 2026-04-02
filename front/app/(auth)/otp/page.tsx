"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import BasicPage from "@/components/BasicPage";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import { verifyOtp } from "@/utils/api/client";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  const { loading, error, run } = useRequest<typeof verifyOtp>();

  const { fields, handleInputChange, handleSubmit } = useForm(
    { otp: "" },
    (data) => {
      run(verifyOtp({ body: { phone, otp: data.otp } }), (resp) => {
        if (resp.data.needsRegistration) {
          router.push("/register");
        } else {
          router.push("/courses");
        }
      });
    },
  );

  return (
    <BasicPage>
      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-xl font-bold mb-2 text-center">Enter your code</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          We sent a code to {phone}. Check your console in development.
        </p>
        <Form
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
          submit={{ children: "Verify" }}
        >
          <Input
            id="otp"
            name="otp"
            type="text"
            label="OTP code"
            placeholder="123456"
            value={fields.otp}
            onChange={handleInputChange}
            required
          />
        </Form>
      </div>
    </BasicPage>
  );
}

export default function OtpPage() {
  return (
    <Suspense>
      <OtpForm />
    </Suspense>
  );
}
