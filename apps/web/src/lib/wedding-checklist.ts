import data from "@/lib/wedding-checklist-data.json";

export type ChecklistSection = {
  title: string;
  tasks: string[];
};

export type ChecklistEvent = {
  id: string;
  title: string;
  sections: ChecklistSection[];
};

const titles: Record<string, string> = {
  lamaran: "Lamaran",
  pengajian: "Pengajian",
  akad: "Akad",
  resepsi: "Resepsi",
};

export const weddingChecklist: ChecklistEvent[] = Object.entries(data).map(([id, sections]) => ({
  id,
  title: titles[id] ?? id,
  sections: sections.map((section) => ({ title: section.title, tasks: section.tasks })),
}));

export function checklistTaskCount(events: ChecklistEvent[]) {
  return events.reduce((sum, event) => sum + event.sections.reduce((inner, section) => inner + section.tasks.length, 0), 0);
}
