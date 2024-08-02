import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "./config";

// Queries
export const fetchNotes = async () => {
  console.log("fetching notes...");
  const { data } = await axios.get(config.apiUrl + "/note", {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  return data.notes;
};
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

// Mutations

export function useRejectDocumentSuggestion(documentSuggestionId) {
  const reject_updateDocumentSuggestion = async () => {
    const { data } = await axios.post(
      config.apiUrl + `/draft/suggestion/${documentSuggestionId}/reject`,
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    return data.notes;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: reject_updateDocumentSuggestion,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  return {
    rejectDocumentSuggestion: mutate,
  };
}

export function useAcceptDocumentSuggestion(documentSuggestionId) {
  const accept_updateDocumentSuggestion = async () => {
    const { data } = await axios.post(
      config.apiUrl + `/draft/suggestion/${documentSuggestionId}/accept`,
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    return data.notes;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: accept_updateDocumentSuggestion,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  return {
    acceptDocumentSuggestion: mutate,
  };
}

export function useSubmitDocumentPrompt({ promptString, noteId }) {
  const accept_updateDocumentSuggestion = async () => {
    const { data } = await axios.post(config.apiUrl + `/draft/documentprompt`, {
      data: {
        promptString,
        noteId,
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    return data.notes;
  };

  const queryClient = useQueryClient();

  const onError = (error) => {
    alert(JSON.stringify(error));
  };

  const onSuccess = () => {
    queryClient.invalidateQueries(["notes"]);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: accept_updateDocumentSuggestion,
    onSuccess,
    onError,
  });

  return {
    acceptDocumentSuggestion: mutate,
    loading: isPending,
  };
}
