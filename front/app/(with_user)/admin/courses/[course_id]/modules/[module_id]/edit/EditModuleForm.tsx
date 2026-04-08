"use client";

import { useRouter } from "next/navigation";

import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import { updateModule } from "@/utils/api/client";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

export default function EditModuleForm({
  courseId,
  moduleId,
  current,
}: {
  courseId: number;
  moduleId: number;
  current: { title: string; order: number };
}) {
  const router = useRouter();
  const { loading, error, run } = useRequest();

  const { fields, handleInputChange, handleSubmit } = useForm(
    { title: current.title, order: String(current.order) },
    (data) => {
      run(
        updateModule({
          params: { courseId, moduleId },
          body: {
            title: data.title,
            order: Number.parseInt(data.order, 10),
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
            required
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
