"use client";

import { dummyAccounts, roleLabel } from "@/lib/dummy-accounts";
import { useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { cx } from "@/lib/cx";

type Mode = "masuk" | "daftar";

type Values = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const emptyValues: Values = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirm: "",
  consent: false,
};

const inputClass =
  "w-full max-w-full min-h-11 rounded-2xl border border-control-border bg-paper px-4 text-base text-ink";

export function AccountForm({ mode, signedInName, googleError }: { mode: Mode; signedInName?: string; googleError?: string }) {
  const formId = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState("");
  const isSignup = mode === "daftar";

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values, isSignup);
    setErrors(nextErrors);
    const ok = Object.keys(nextErrors).length === 0;
    setFormError("");
    if (!ok) {
      setReady(false);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    if (isSignup) {
      setReady(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setPending(true);
    const response = await fetch("/api/masuk", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: values.username, password: values.password }),
    });
    setPending(false);
    const data = await response.json().catch(() => null) as { panelUrl?: unknown } | null;
    if (!response.ok) {
      setFormError(response.status === 401
        ? "Nama pengguna atau kata sandi tidak cocok."
        : "Pengguna di panel belum bisa dihubungi.");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    if (typeof data?.panelUrl === "string") {
      window.location.assign(data.panelUrl);
      return;
    }
    window.location.assign("/dashboard");
  }

  const errorCount = Object.keys(errors).length;

  return (
    <>
      <p className="eyebrow">{isSignup ? "Sign up" : "Login"}</p>
      <h1 id={isSignup ? "judul-daftar" : "judul-masuk"}>{isSignup ? "Daftar" : "Masuk"}</h1>
      <p className="account-lead">
        {isSignup
          ? "Buat akun untuk menyimpan percakapan dengan Makna. Formulir ini menampilkan pratinjau dan belum membuat akun."
          : "Masuk dengan akun percobaan, atau lanjutkan dengan Gmail."}
      </p>
      {signedInName ? (
        <p className="account-lead">Anda sudah masuk sebagai {signedInName}. Membuka dashboard tidak meminta kata sandi lagi.</p>
      ) : null}
      {isSignup ? null : (
        <div className="account-demo">
          <p>Akun percobaan</p>
          <ul>
            {dummyAccounts.map((account) => (
              <li key={account.username}>
                <span>{roleLabel(account.role)}</span>
                {account.username} · {account.password}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isSignup ? null : (
        <>
          <a className="account-google" href="/api/masuk/google">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
              <path fill="#FBBC05" d="M3.98 10.72A5.4 5.4 0 0 1 3.7 9c0-.6.1-1.18.28-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.05l3.02-2.33Z" />
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.02 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
            </svg>
            Masuk dengan Gmail
          </a>
          <p className="account-or">atau</p>
        </>
      )}

      <form onSubmit={onSubmit} noValidate>
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
          {formError || googleError ? <p className="mb-5 text-sm leading-relaxed text-error">{formError || googleError}</p> : null}
          {ready ? (
            <div className="mb-5 rounded-2xl bg-ivory p-4 text-sm leading-relaxed">
              <p className="font-semibold">{isSignup ? "Pratinjau pendaftaran" : "Pratinjau masuk"}</p>
              <p className="mt-1 text-muted">
                {isSignup
                  ? "Akun belum dibuat. Penyimpanan menyala setelah pendaftaran tersedia."
                  : "Akun belum diperiksa. Masuk menyala setelah penyimpanan akun tersedia."}
              </p>
              <dl className="mt-3 grid gap-2">
                {isSignup ? <PreviewItem label="Nama" value={values.name.trim()} /> : null}
                <PreviewItem label="Email" value={values.email.trim()} />
                <PreviewItem label="Kata sandi" value="Tidak ditampilkan" />
              </dl>
            </div>
          ) : null}
        </div>

        <div className="grid gap-5">
          {isSignup ? (
            <Field
              id={`${formId}-name`}
              label="Nama"
              value={values.name}
              error={errors.name}
              autoComplete="name"
              onChange={(value) => update("name", value)}
            />
          ) : null}
          {isSignup ? (
            <Field
              id={`${formId}-email`}
              label="Email"
              type="email"
              value={values.email}
              error={errors.email}
              autoComplete="email"
              onChange={(value) => update("email", value)}
            />
          ) : (
            <Field
              id={`${formId}-username`}
              label="Nama pengguna"
              value={values.username}
              error={errors.username}
              autoComplete="username"
              onChange={(value) => update("username", value)}
            />
          )}
          <div className="min-w-0">
            <label htmlFor={`${formId}-password`} className="mb-2 block text-sm font-medium">
              Kata sandi
            </label>
            <div className="account-password">
              <input
                id={`${formId}-password`}
                type={showPassword ? "text" : "password"}
                value={values.password}
                autoComplete={isSignup ? "new-password" : "current-password"}
                aria-invalid={errors.password ? true : undefined}
                aria-describedby={errors.password ? `${formId}-password-error` : `${formId}-password-hint`}
                className={inputClass}
                onChange={(event) => update("password", event.target.value)}
              />
              <button
                type="button"
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Sembunyikan" : "Lihat"}
              </button>
            </div>
            <p id={`${formId}-password-hint`} className="mt-2 text-sm text-muted">
              Minimal 8 karakter.
            </p>
            {errors.password ? (
              <p id={`${formId}-password-error`} className="mt-2 text-sm text-error">
                {errors.password}
              </p>
            ) : null}
          </div>
          {isSignup ? (
            <Field
              id={`${formId}-confirm`}
              label="Ulangi kata sandi"
              type={showPassword ? "text" : "password"}
              value={values.confirm}
              error={errors.confirm}
              autoComplete="new-password"
              onChange={(value) => update("confirm", value)}
            />
          ) : null}
          {isSignup ? (
            <div className="min-w-0">
              <label className="flex min-h-11 items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 size-5 shrink-0 accent-brand"
                  checked={values.consent}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
                  onChange={(event) => update("consent", event.target.checked)}
                />
                <span className="text-sm leading-relaxed">Saya bersedia Makna menyimpan nama dan email ini ketika pendaftaran sudah aktif.</span>
              </label>
              {errors.consent ? (
                <p id={`${formId}-consent-error`} className="mt-2 text-sm text-error">
                  {errors.consent}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <button type="submit" className={buttonClass("primary", "mt-6 inline-flex w-full")} disabled={pending}>
          {isSignup ? (ready ? "Perbarui pratinjau" : "Lihat pratinjau") : pending ? "Memeriksa…" : "Masuk"}
        </button>
      </form>

      <p className="account-switch">
        {isSignup ? (
          <>Sudah punya akun? <Link href="/masuk">Masuk</Link></>
        ) : (
          <>Belum punya akun? <Link href="/daftar">Daftar</Link>. Atau buka <Link href="/dashboard">dashboard</Link> jika sesi percobaan masih ada.</>
        )}
      </p>
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx(inputClass)}
        onChange={(event) => onChange(event.target.value)}
      />
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

function validate(values: Values, isSignup: boolean): Errors {
  const errors: Errors = {};
  const email = values.email.trim();
  if (isSignup && values.name.trim().length < 2) errors.name = "Isi nama, minimal 2 karakter.";
  if (!isSignup && values.username.trim().length < 2) errors.username = "Isi nama pengguna.";
  if (isSignup && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Isi email yang lengkap.";
  if (values.password.length < 8) errors.password = "Kata sandi minimal 8 karakter.";
  if (isSignup && values.confirm !== values.password) errors.confirm = "Ulangi kata sandi yang sama.";
  if (isSignup && !values.consent) errors.consent = "Persetujuan diperlukan sebelum pratinjau ditampilkan.";
  return errors;
}
