"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { RadioOption } from "@/hl-common/entities/Cards";
import { card_interaction_type } from "@/hl-common/PrismaEnums";

import { Button } from "@/components/forms/Button";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import TextArea from "@/components/forms/TextArea";
import { H2 } from "@/components/Headings";
import Panel from "@/components/Panel";
import { updateCard } from "@/utils/api/client";
import { useForm } from "@/utils/useForm";
import { useRequest } from "@/utils/useRequest";

export default function EditCardForm({
  courseId,
  moduleId,
  cardId,
  current,
}: {
  courseId: number;
  moduleId: number;
  cardId: number;
  current: {
    title: string;
    body: string;
    interaction_type: card_interaction_type;
    options: RadioOption[] | null;
    order: number;
  };
}) {
  const router = useRouter();
  const { loading, error, run } = useRequest();

  const [radioOptions, setRadioOptions] = useState<RadioOption[]>(
    current.options ?? [{ label: "", correct: true }, { label: "", correct: false }],
  );

  const { fields, handleInputChange, handleSubmit } = useForm(
    {
      title: current.title,
      body: current.body,
      interaction_type: current.interaction_type,
      order: String(current.order),
    },
    (data) => {
      const isRadio = data.interaction_type === card_interaction_type.radio;
      run(
        updateCard({
          params: { courseId, moduleId, cardId },
          body: {
            title: data.title,
            body: data.body,
            interaction_type: data.interaction_type as card_interaction_type,
            options: isRadio ? radioOptions.filter((o) => o.label.trim()) : undefined,
            order: Number.parseInt(data.order, 10),
          },
        }),
        () => router.push(`/admin/courses/${courseId}/modules/${moduleId}/cards`),
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
      <H2 className="mb-6">Edit Card</H2>
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
            name="body"
            label="Body"
            value={fields.body}
            onChange={handleInputChange}
            rows={4}
          />
          <Select
            name="interaction_type"
            label="Interaction type"
            value={fields.interaction_type}
            onChange={handleInputChange}
          >
            <option value={card_interaction_type.next}>Next (continue button)</option>
            <option value={card_interaction_type.radio}>Radio (multiple choice)</option>
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
