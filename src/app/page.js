"use client";
import { useEffect, useState } from "react";
import { fetchNotes, useNotes } from "./api";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch data from an API endpoint (replace with your actual API endpoint)
    const fetchData = async () => {
      const notes = await fetchNotes();
      setNotes(notes);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Navigate to the first note's page after notes are fetched
    if (notes.length > 0) {
      router.push(`/notes/${notes[0].id}`);
    }
  }, [notes, router]);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>Loading...</span>
    </main>
  );
}
