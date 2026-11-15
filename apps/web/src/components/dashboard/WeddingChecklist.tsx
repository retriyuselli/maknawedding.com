"use client";

import { useEffect, useMemo, useState } from "react";
import { readNotes, writeNotes } from "@/lib/browser-notes";
import { checklistTaskCount, weddingChecklist, type ChecklistEvent } from "@/lib/wedding-checklist";
import "./wedding-checklist.css";

function taskKey(eventId: string, section: string, task: string) {
  return `${eventId}::${section}::${task}`;
}

export function WeddingChecklist({ username }: { username: string }) {
  const [acara, setAcara] = useState("semua");
  const [query, setQuery] = useState("");
  const [openEvents, setOpenEvents] = useState<string[]>(["lamaran"]);
  const [openSections, setOpenSections] = useState<string[]>(["lamaran:Kesepakatan Keluarga"]);
  const [done, setDone] = useState<string[] | null>(null);
  const needle = query.trim().toLowerCase();
  const finished = useMemo(() => new Set(done ?? []), [done]);

  useEffect(() => {
    setDone(readNotes<string>(username, "checklist").filter((item) => typeof item === "string"));
  }, [username]);

  useEffect(() => {
    if (acara !== "semua") setOpenEvents([acara]);
  }, [acara]);

  const events = useMemo(() => {
    const selected = acara === "semua" ? weddingChecklist : weddingChecklist.filter((event) => event.id === acara);
    if (!needle) return selected;
    return selected.flatMap((event) => {
      const sections = event.sections.flatMap((section) => {
        const tasks = section.tasks.filter((task) => task.toLowerCase().includes(needle) || section.title.toLowerCase().includes(needle));
        return tasks.length ? [{ ...section, tasks }] : [];
      });
      return sections.length ? [{ ...event, sections }] : [];
    });
  }, [acara, needle]);

  const total = checklistTaskCount(weddingChecklist);
  const visible = checklistTaskCount(events);
  const doneCount = weddingChecklist.reduce((sum, event) => sum + finishedCount(event, finished), 0);

  function toggleTask(id: string) {
    if (!done) return;
    const next = done.includes(id) ? done.filter((item) => item !== id) : [...done, id];
    writeNotes(username, "checklist", next);
    setDone(next);
  }

  function toggle(list: string[], key: string, setList: (value: string[]) => void) {
    setList(list.includes(key) ? list.filter((item) => item !== key) : [...list, key]);
  }

  function eventOpen(event: ChecklistEvent) {
    return needle !== "" || openEvents.includes(event.id);
  }

  function sectionOpen(eventId: string, title: string) {
    return needle !== "" || openSections.includes(`${eventId}:${title}`);
  }

  return (
    <div className="wedding-checklist">
      <label className="wedding-checklist-search">
        <span>Cari tugas</span>
        <input
          type="search"
          value={query}
          placeholder="Cari tugas atau kelompok"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="wedding-checklist-filters" role="group" aria-label="Saring acara">
        <button type="button" aria-pressed={acara === "semua"} onClick={() => setAcara("semua")}>Semua</button>
        {weddingChecklist.map((event) => (
          <button key={event.id} type="button" aria-pressed={acara === event.id} onClick={() => setAcara(event.id)}>
            {event.title}
          </button>
        ))}
      </div>
      <dl className="wedding-checklist-summary">
        <div>
          <dt>Belum mulai</dt>
          <dd>{total - doneCount}</dd>
        </div>
        <div>
          <dt>Sedang dikerjakan</dt>
          <dd>0</dd>
        </div>
        <div>
          <dt>Selesai</dt>
          <dd>{doneCount}</dd>
        </div>
      </dl>
      {events.length === 0 ? <p className="wedding-checklist-empty">Tidak ada tugas yang cocok.</p> : null}
      {events.map((event) => {
        const count = checklistTaskCount([event]);
        const finishedHere = finishedCount(event, finished);
        const opened = eventOpen(event);
        return (
          <section key={event.id} className="wedding-checklist-event">
            <h2>
              <button
                type="button"
                aria-expanded={opened}
                onClick={() => toggle(openEvents, event.id, setOpenEvents)}
              >
                <span>{event.title}</span>
                <span>{count} tugas · {finishedHere} selesai</span>
              </button>
            </h2>
            {opened ? (
              <>
                <p className="wedding-checklist-meta">Tanggal belum terhubung. Tempat belum terhubung.</p>
                {event.sections.map((section) => {
                  const key = `${event.id}:${section.title}`;
                  const sectionOpened = sectionOpen(event.id, section.title);
                  return (
                    <div key={key} className="wedding-checklist-section">
                      <h3>
                        <button
                          type="button"
                          aria-expanded={sectionOpened}
                          onClick={() => toggle(openSections, key, setOpenSections)}
                        >
                          <span>{section.title}</span>
                          <span>{section.tasks.length}</span>
                        </button>
                      </h3>
                      {sectionOpened ? (
                        <ul>
                          {section.tasks.map((task) => {
                            const id = taskKey(event.id, section.title, task);
                            const isDone = finished.has(id);
                            return (
                              <li key={task} className={isDone ? "is-done" : undefined}>
                                <button
                                  type="button"
                                  className="wedding-checklist-check"
                                  aria-pressed={isDone}
                                  aria-label={isDone ? "Tandai belum mulai" : "Tandai selesai"}
                                  disabled={done === null}
                                  onClick={() => toggleTask(id)}
                                >
                                  <span aria-hidden="true">{isDone ? "✓" : ""}</span>
                                </button>
                                <div>
                                  <p>{task}</p>
                                  <p className="wedding-checklist-status">{isDone ? "Selesai" : "Belum mulai"}</p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </div>
                  );
                })}
              </>
            ) : null}
          </section>
        );
      })}
      <p className="wedding-checklist-note">Menampilkan {visible} tugas dari {total}. Centang tersimpan di peramban akun ini, belum di server.</p>
    </div>
  );
}

function finishedCount(event: ChecklistEvent, finished: Set<string>) {
  return event.sections.reduce(
    (sum, section) => sum + section.tasks.filter((task) => finished.has(taskKey(event.id, section.title, task))).length,
    0,
  );
}
