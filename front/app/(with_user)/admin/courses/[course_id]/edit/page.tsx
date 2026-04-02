"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import TextArea from "@/components/forms/TextArea";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import { updateCourse } from "@/utils/api/client";
import idOrNotFound from "@/utils/api/idOrNotFound";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

export default function AdminEditCoursePage(props: {
  params: Promise<{ course_id: string }>;
}) {
  const params = use(props.params);
  const courseId = idOrNotFound(params.course_id);
  const router = useRouter();
  const { loading, error, run } = useRequest();

  const { fields, handleInputChange, handleSubmit } = useForm(
    { title: "", description: "" },
    (data) => {
      run(
        updateCourse({
          params: { courseId },
          body: {
            title: data.title || undefined,
            description: data.description || undefined,
          },
        }),
        () => router.push("/admin/courses"),
      );
    },
  );

  return (
    <div>
      <H2 className="mb-6">Edit Course</H2>
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
          <TextArea
            name="description"
            label="Description"
            value={fields.description}
            onChange={handleInputChange}
            placeholder="Leave blank to keep existing"
            rows={3}
          />
        </Form>
      </Panel>
    </div>
  );
}
