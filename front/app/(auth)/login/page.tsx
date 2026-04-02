"use client";

import { useRouter } from "next/navigation";

import BasicPage from "@/components/BasicPage";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import { sendOtp } from "@/utils/api/client";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

export default function LoginPage() {
  const router = useRouter();
  const { loading, error, run } = useRequest<typeof sendOtp>();

  const { fields, handleInputChange, handleSubmit } = useForm(
    { phone: "" },
    (data) => {
      run(sendOtp({ body: { phone: data.phone } }), () => {
        router.push(`/otp?phone=${encodeURIComponent(data.phone)}`);
      });
    },
  );

  return (
    <BasicPage>
      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-xl font-bold mb-6 text-center">Sign in</h2>
        <Form
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
          submit={{ children: "Send OTP" }}
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            label="Phone number"
            placeholder="+2348031234567"
            value={fields.phone}
            onChange={handleInputChange}
            required
          />
        </Form>
      </div>
    </BasicPage>
  );
}
