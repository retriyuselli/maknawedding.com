export type AccountRole = "pengunjung" | "kantor" | "konsumen";

export type SessionUser = {
  username: string;
  name: string;
  role: AccountRole;
};

export type DummyAccount = SessionUser & {
  password: string;
};

export const dummyAccounts: DummyAccount[] = [
  {
    username: "pengunjung",
    password: "makna-tamu",
    name: "Tamu Percobaan",
    role: "pengunjung",
  },
  {
    username: "kantor",
    password: "makna-kantor",
    name: "Staf Percobaan",
    role: "kantor",
  },
  {
    username: "konsumen",
    password: "makna-konsumen",
    name: "Konsumen Percobaan",
    role: "konsumen",
  },
];

export function roleLabel(role: AccountRole) {
  if (role === "kantor") return "Anak kantor";
  if (role === "konsumen") return "Konsumen";
  return "Pengunjung";
}

export function matchDummyAccount(username: string, password: string) {
  const name = username.trim().toLowerCase();
  return dummyAccounts.find((account) => account.username === name && account.password === password) ?? null;
}
