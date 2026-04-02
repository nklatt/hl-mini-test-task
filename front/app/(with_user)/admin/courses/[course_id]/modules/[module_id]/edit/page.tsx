"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import { updateModule } from "@/utils/api/client";
import idOrNotFound from "@/utils/api/idOrNotFound";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

export default function AdminEditModulePage(props: {
  params: Promise<{ course_id: string; module_id: string }>;
}) {
  const params = use(props.params);
  const courseId = idOrNotFound(params.course_id);
  const moduleId = idOrNotFound(params.module_id);
  const router = useRouter();
  const { loading, error, run } = useRequest();

  const { fields, handleInputChange, handleSubmit } = useForm(
    { title: "", order: "" },
    (data) => {
      run(
        updateModule({
          params: { courseId, moduleId },
          body: {
            title: data.title || undefined,
            order: data.order ? Number.parseInt(data.order, 10) : undefined,
          },
        }),
        () => router.push(`/admin/courses/${courseId}/modules`),
      );
    },
  );

  return (
    <div>
      <H2 className="mb-6">Edit Module</H2>
      <Panel>
        <Form
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submit={{ children: "Save Changes" }}
        >
          <Input
            name="title"
            label="Title"
            value={fields.title}
            onChange={handleInputChange}
            placeholder="Leave blank to keep existing"
          />
          <Input
            name="order"
            label="Order"
            type="number"
            value={fields.order}
            onChange={handleInputChange}
            placeholder="Leave blank to keep existing"
          />
        </Form>
      </Panel>
    </div>
  );
}
