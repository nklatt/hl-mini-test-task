"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import { createModule } from "@/utils/api/client";
import idOrNotFound from "@/utils/api/idOrNotFound";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

export default function AdminCreateModulePage(props: {
  params: Promise<{ course_id: string }>;
}) {
  const params = use(props.params);
  const courseId = idOrNotFound(params.course_id);
  const router = useRouter();
  const { loading, error, run } = useRequest();

  const { fields, handleInputChange, handleSubmit } = useForm(
    { title: "", order: "1" },
    (data) => {
      run(
        createModule({
          params: { courseId },
          body: { title: data.title, order: Number.parseInt(data.order, 10) },
        }),
        () => router.push(`/admin/courses/${courseId}/modules`),
      );
    },
  );

  return (
    <div>
      <H2 className="mb-6">New Module</H2>
      <Panel>
        <Form
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submit={{ children: "Create Module" }}
        >
          <Input
            name="title"
            label="Title"
            value={fields.title}
            onChange={handleInputChange}
            required
            placeholder="Module title"
          />
          <Input
            name="order"
            label="Order"
            type="number"
            value={fields.order}
            onChange={handleInputChange}
            min={1}
          />
        </Form>
      </Panel>
    </div>
  );
}
