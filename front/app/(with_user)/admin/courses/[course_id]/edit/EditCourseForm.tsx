"use client";

import { useRouter } from "next/navigation";

import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import TextArea from "@/components/forms/TextArea";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import { updateCourse } from "@/utils/api/client";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

export default function EditCourseForm({
  courseId,
  current,
}: {
  courseId: number;
  current: { title: string; description: string };
}) {
  const router = useRouter();
  const { loading, error, run } = useRequest();

  const { fields, handleInputChange, handleSubmit } = useForm(
    { title: current.title, description: current.description },
    (data) => {
      run(
        updateCourse({
          params: { courseId },
          body: { title: data.title, description: data.description },
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
            required
          />
          <TextArea
            name="description"
            label="Description"
            value={fields.description}
            onChange={handleInputChange}
            rows={3}
          />
        </Form>
      </Panel>
    </div>
  );
}
