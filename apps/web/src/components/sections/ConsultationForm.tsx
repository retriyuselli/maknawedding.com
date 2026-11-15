"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { buttonClass } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { consultation, services } from "@/lib/home-content";
import { cx } from "@/lib/cx";

type FieldName = "name" | "email" | "phone" | "city" | "consent";
type Errors = Partial<Record<FieldName, string>>;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  city: string;
  eventDate: string;
  serviceId: string;
  message: string;
  consent: boolean;
};

const emptyValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  city: "",
  eventDate: "",
  serviceId: "",
  message: "",
  consent: false,
};

const inputClass =
  "w-full max-w-full min-h-11 rounded-2xl border border-control-border bg-paper px-4 text-base text-ink transition-colors duration-[180ms]";

export function ConsultationForm() {
  const formId = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [preview, setPreview] = useState<FormValues | null>(null);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setPreview(null);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setPreview(values);
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  const serviceTitle = services.find((service) => service.id === preview?.serviceId)?.title;
  const errorCount = Object.keys(errors).length;

  return (
    <section className="bg-lilac py-(--section-space)" aria-labelledby="konsultasi">
      <div className="mx-auto grid w-full max-w-(--layout-max) gap-8 px-(--layout-gutter) lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading
            id="konsultasi"
            eyebrow={consultation.eyebrow}
            title={consultation.title}
            intro={consultation.intro}
            tone="on-lilac"
          />
        </div>

        <form className="min-w-0 rounded-feature bg-paper p-5 sm:p-8 lg:col-span-7" onSubmit={onSubmit} noValidate>
          <div
            ref={summaryRef}
            tabIndex={-1}
            role={errorCount > 0 ? "alert" : "status"}
            aria-live="polite"
            className="scroll-mt-28 rounded-2xl outline-offset-4"
          >
            {errorCount > 0 ? (
              <p className="mb-5 text-sm leading-relaxed text-error">Periksa {errorCount} isian yang masih perlu dilengkapi.</p>
            ) : null}
            {preview ? (
              <div className="mb-5 rounded-2xl bg-ivory p-4 text-sm leading-relaxed">
                <p className="font-semibold">Pratinjau permintaan</p>
                <p className="mt-1 text-muted">
                  Belum dikirim ke tim Makna. Pengiriman menyala setelah endpoint konsultasi tersedia.
                </p>
                <dl className="mt-3 grid gap-2">
                  <PreviewItem label="Nama" value={preview.name} />
                  <PreviewItem label="Email" value={preview.email || "Tidak diisi"} />
                  <PreviewItem label="Telepon" value={preview.phone || "Tidak diisi"} />
                  <PreviewItem label="Kota" value={preview.city} />
                  <PreviewItem label="Tanggal" value={formatDate(preview.eventDate)} />
                  <PreviewItem label="Layanan" value={serviceTitle || "Belum dipilih"} />
                  <PreviewItem label="Pesan" value={preview.message || "Tidak diisi"} />
                </dl>
              </div>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id={`${formId}-name`}
              className="sm:col-span-2"
              label="Nama"
              value={values.name}
              error={errors.name}
              autoComplete="name"
              onChange={(value) => update("name", value)}
            />
            <TextField
              id={`${formId}-email`}
              label="Email"
              type="email"
              hint="Opsional"
              value={values.email}
              error={errors.email}
              autoComplete="email"
              onChange={(value) => update("email", value)}
            />
            <TextField
              id={`${formId}-phone`}
              label="Telepon"
              type="tel"
              hint="Opsional"
              value={values.phone}
              error={errors.phone}
              autoComplete="tel"
              onChange={(value) => update("phone", value)}
            />
            <TextField
              id={`${formId}-city`}
              label="Kota acara"
              value={values.city}
              error={errors.city}
              autoComplete="address-level2"
              onChange={(value) => update("city", value)}
            />
            <TextField
              id={`${formId}-date`}
              label="Tanggal acara"
              type="date"
              hint="Opsional"
              value={values.eventDate}
              autoComplete="off"
              onChange={(value) => update("eventDate", value)}
            />
            <div className="min-w-0 sm:col-span-2">
              <label htmlFor={`${formId}-service`} className="mb-2 block text-sm font-medium">
                Layanan
              </label>
              <select
                id={`${formId}-service`}
                className={inputClass}
                value={values.serviceId}
                onChange={(event) => update("serviceId", event.target.value)}
              >
                <option value="">Belum dipilih</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0 sm:col-span-2">
              <label htmlFor={`${formId}-message`} className="mb-2 block text-sm font-medium">
                Pesan
              </label>
              <textarea
                id={`${formId}-message`}
                className={cx(inputClass, "min-h-32 py-3")}
                value={values.message}
                maxLength={2000}
                onChange={(event) => update("message", event.target.value)}
              />
              <p className="mt-2 text-sm text-muted">Opsional, paling banyak 2000 karakter.</p>
            </div>
            <div className="min-w-0 sm:col-span-2">
              <label className="flex min-h-11 items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 size-5 shrink-0 accent-brand"
                  checked={values.consent}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
                  onChange={(event) => update("consent", event.target.checked)}
                />
                <span className="text-sm leading-relaxed">{consultation.consent}</span>
              </label>
              {errors.consent ? (
                <p id={`${formId}-consent-error`} className="mt-2 text-sm text-error">
                  {errors.consent}
                </p>
              ) : null}
            </div>
          </div>

          <button type="submit" className={buttonClass("primary", "mt-6 inline-flex w-full sm:w-auto")}>
            {preview ? "Perbarui pratinjau" : "Lihat pratinjau"}
          </button>
        </form>
      </div>
    </section>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  autoComplete,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cx("min-w-0", className)}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={inputClass}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function PreviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="break-words">{value}</dd>
    </div>
  );
}

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Isi nama, minimal 2 karakter.";
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Isi email yang lengkap, atau kosongkan bila tidak ingin dicantumkan.";
  }
  if (values.phone.trim() && !/^[0-9+\s()-]{8,20}$/.test(values.phone.trim())) {
    errors.phone = "Isi nomor yang bisa dihubungi, atau kosongkan bidang ini.";
  }
  if (values.city.trim().length < 2) errors.city = "Isi kota acara.";
  if (!values.consent) errors.consent = "Persetujuan diperlukan sebelum pratinjau disimpan.";
  return errors;
}

function formatDate(value: string) {
  if (!value) return "Tidak diisi";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}
