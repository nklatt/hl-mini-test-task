"use client";

import { useRouter } from "next/navigation";

import BasicPage from "@/components/BasicPage";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import { register } from "@/utils/api/client";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

export default function RegisterPage() {
  const router = useRouter();
  const { loading, error, run } = useRequest<typeof register>();

  const { fields, handleInputChange, handleSubmit } = useForm(
    { first: "", last: "" },
    (data) => {
      run(register({ body: { first: data.first, last: data.last } }), () => {
        router.push("/courses");
      });
    },
  );

  return (
    <BasicPage>
      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-xl font-bold mb-6 text-center">
          Complete your profile
        </h2>
        <Form
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
          submit={{ children: "Save & Continue" }}
        >
          <Input
            id="first"
            name="first"
            type="text"
            label="First name"
            placeholder="Amara"
            value={fields.first}
            onChange={handleInputChange}
            required
          />
          <Input
            id="last"
            name="last"
            type="text"
            label="Last name"
            placeholder="Nwosu"
            value={fields.last}
            onChange={handleInputChange}
            required
          />
        </Form>
      </div>
    </BasicPage>
  );
}
