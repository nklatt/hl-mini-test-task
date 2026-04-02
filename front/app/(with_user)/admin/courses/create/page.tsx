"use client";

import { useRouter } from "next/navigation";

import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import TextArea from "@/components/forms/TextArea";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import { createCourse } from "@/utils/api/client";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

export default function AdminCreateCoursePage() {
  const router = useRouter();
  const { loading, error, run } = useRequest();

  const { fields, handleInputChange, handleSubmit } = useForm(
    { title: "", description: "" },
    (data) => {
      run(
        createCourse({
          body: {
            title: data.title,
            description: data.description || undefined,
          },
        }),
        () => router.push("/admin/courses"),
      );
    },
  );

  return (
    <div>
      <H2 className="mb-6">New Course</H2>
      <Panel>
        <Form
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submit={{ children: "Create Course" }}
        >
          <Input
            name="title"
            label="Title"
            value={fields.title}
            onChange={handleInputChange}
            required
            placeholder="Course title"
          />
          <TextArea
            name="description"
            label="Description"
            value={fields.description}
            onChange={handleInputChange}
            placeholder="Optional description"
            rows={3}
          />
        </Form>
      </Panel>
    </div>
  );
}
