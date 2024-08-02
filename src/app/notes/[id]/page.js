"use client";
import Image from "next/image";
import axios from "axios";
import styles from "./page.module.css";
import LeftBar, { LEFT_BAR_HEIGHT, TOP_BAR_HEIGHT } from "./components/LeftBar";
import { useParams } from "next/navigation";
import TranscriptDocument from "./components/TranscriptDocument";
import TopBar from "./components/TopBar";
import { useNotes } from "@/app/api";
import DraftDocument from "./components/DraftDocument";

export default function Note() {
  const { id: selectedNoteId } = useParams();
  const { notes } = useNotes();
  const [selectedNote] = notes.filter(
    (n) => n.id.toString() === selectedNoteId.toString()
  );
  return (
    <main className={styles.main}>
      <TopBar />
      <LeftBar notes={notes} selectedNoteId={selectedNoteId} />
      <div
        className={styles.content}
        style={{ marginTop: TOP_BAR_HEIGHT, marginLeft: LEFT_BAR_HEIGHT + 8 }}
      >
        {!selectedNote?.drafts.length && (
          <TranscriptDocument selectedNote={selectedNote} />
        )}
        {selectedNote?.drafts.length > 0 && (
          <DraftDocument note={selectedNote} />
        )}
      </div>
    </main>
  );
}
