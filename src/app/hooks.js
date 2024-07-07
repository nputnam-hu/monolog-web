import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import config from "./config";

export async function fetchNotes() {
  const { data } = await axios.get(config.apiUrl + "/note", {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  return data.notes;
}

export function useNotes() {
  const {
    data: notes,
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["notes"], queryFn: fetchNotes });
  // const [selectedNote, setSelectedNote] = useState(notes?.[0]?.id || null);

  return {
    notes: notes || [],
    isPending,
    isError,
    error,
  };
}
