"use client";

import { useMemo, useState } from "react";

type LegalAcknowledgmentField = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

export function LegalAcknowledgmentControls({
  fields,
  submitLabel,
}: {
  fields: LegalAcknowledgmentField[];
  submitLabel: string;
}) {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(fields.map((field) => [field.name, Boolean(field.defaultChecked)])),
  );

  const canSubmit = useMemo(
    () => fields.every((field) => Boolean(state[field.name])),
    [fields, state],
  );

  return (
    <>
      {fields.map((field) => (
        <label
          key={field.name}
          className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300"
        >
          <input
            type="checkbox"
            name={field.name}
            className="mr-3"
            checked={Boolean(state[field.name])}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                [field.name]: event.target.checked,
              }))
            }
          />
          {field.label}
        </label>
      ))}
      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-[0.95rem] border border-accent/60 bg-accent px-5 text-sm font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-soft hover:bg-accent-soft disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/15 disabled:text-zinc-400 disabled:hover:translate-y-0"
      >
        {submitLabel}
      </button>
    </>
  );
}
