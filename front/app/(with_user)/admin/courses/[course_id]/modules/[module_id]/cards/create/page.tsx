"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { card_interaction_type } from "@/hl-common/PrismaEnums";

import { Button } from "@/components/forms/Button";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import TextArea from "@/components/forms/TextArea";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import { createCard } from "@/utils/api/client";
import idOrNotFound from "@/utils/api/idOrNotFound";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

export default function AdminCreateCardPage(props: {
  params: Promise<{ course_id: string; module_id: string }>;
}) {
  const params = use(props.params);
  const courseId = idOrNotFound(params.course_id);
  const moduleId = idOrNotFound(params.module_id);
  const router = useRouter();
  const { loading, error, run } = useRequest();

  const [radioOptions, setRadioOptions] = useState([
    { label: "", correct: true },
    { label: "", correct: false },
  ]);

  const { fields, handleInputChange, handleSubmit } = useForm(
    {
      title: "",
      body: "",
      interaction_type: card_interaction_type.next as card_interaction_type,
      order: "1",
    },
    (data) => {
      const isRadio = data.interaction_type === card_interaction_type.radio;
      run(
        createCard({
          params: { courseId, moduleId },
          body: {
            title: data.title,
            body: data.body,
            interaction_type: data.interaction_type as card_interaction_type,
            options: isRadio
              ? radioOptions.filter((o) => o.label.trim())
              : undefined,
            order: Number.parseInt(data.order, 10),
          },
        }),
        () =>
          router.push(`/admin/courses/${courseId}/modules/${moduleId}/cards`),
      );
    },
  );

  const isRadio = fields.interaction_type === card_interaction_type.radio;

  const updateOption = (idx: number, label: string) => {
    setRadioOptions((prev) =>
      prev.map((o, i) => (i === idx ? { ...o, label } : o)),
    );
  };

  const setCorrect = (idx: number) => {
    setRadioOptions((prev) =>
      prev.map((o, i) => ({ ...o, correct: i === idx })),
    );
  };

  const addOption = () => {
    setRadioOptions((prev) => [...prev, { label: "", correct: false }]);
  };

  return (
    <div>
      <H2 className="mb-6">New Card</H2>
      <Panel>
        <Form
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submit={{ children: "Create Card" }}
        >
          <Input
            name="title"
            label="Title"
            value={fields.title}
            onChange={handleInputChange}
            required
            placeholder="Card title"
          />
          <TextArea
            name="body"
            label="Body"
            value={fields.body}
            onChange={handleInputChange}
            rows={4}
            placeholder="Card body text"
          />
          <Select
            name="interaction_type"
            label="Interaction type"
            value={fields.interaction_type}
            onChange={handleInputChange}
          >
            <option value={card_interaction_type.next}>
              Next (continue button)
            </option>
            <option value={card_interaction_type.radio}>
              Radio (multiple choice)
            </option>
          </Select>
          <Input
            name="order"
            label="Order"
            type="number"
            value={fields.order}
            onChange={handleInputChange}
            min={1}
          />

          {isRadio && (
            <div className="mb-4">
              <p className="text-gray-500 text-sm mb-2">
                Answer options (mark one as correct):
              </p>
              {radioOptions.map((option, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: options are positional
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="correct_option"
                    checked={option.correct}
                    onChange={() => setCorrect(idx)}
                    aria-label={`Option ${idx + 1} is correct`}
                  />
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => updateOption(idx, e.target.value)}
                    placeholder={`Option ${idx + 1}`}
                    className="flex-1 px-3 py-2 rounded bg-[#F0F0F0] border border-[#DFE2E4] shadow-inner"
                  />
                </div>
              ))}
              <Button type="button" small secondary onClick={addOption}>
                + Add option
              </Button>
            </div>
          )}
        </Form>
      </Panel>
    </div>
  );
}
