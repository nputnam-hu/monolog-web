import { useEffect, useLayoutEffect, useState } from "react";
import useSessionStorage from "@/app/hooks";

export function useDraftDocument(draft) {
  const [activeDocumentSuggestionId, setActiveDocumentSuggestionId] =
    useState(null);

  const selectedDocumentPrompt = draft.documentPrompt;
  const [isSuggestExpanded, setSuggestExpanded] = useState(
    !!selectedDocumentPrompt
  );

  const [documentSuggestionOffsets, setOffsets] = useState({});

  // update html to overlay suggestions on doc
  let enrichedMarkdownString = draft.initialMarkdownString;
  if (selectedDocumentPrompt?.documentSuggestions) {
    for (const suggestion of selectedDocumentPrompt.documentSuggestions) {
      console.log({ suggestion });
      for (const diff of suggestion.documentDiffStructure) {
        const statusClassName = {
          rejected: "rejected",
          accepted: "accepted",
          pending: "pending",
        }[suggestion.status];

        const activeClassName =
          suggestion.id === activeDocumentSuggestionId ? "active" : "default";

        enrichedMarkdownString = enrichedMarkdownString.replace(
          diff.remove.value,
          `\n<text id="suggestion${suggestion.id}" class="suggestremove ${statusClassName} ${activeClassName}">${diff.remove.value}</text><text id="suggestionremove${suggestion.id}" class="suggestadd ${statusClassName} ${activeClassName}">${diff.add.value}</text>`
        );
      }
    }
  }
  const markdownString = isSuggestExpanded
    ? enrichedMarkdownString
    : draft.processedMarkdownString;

  // set offsets
  useLayoutEffect(() => {
    const calculateOffsets = () => {
      if (!selectedDocumentPrompt) return;
      requestAnimationFrame(() => {
        for (const documentSuggestion of selectedDocumentPrompt.documentSuggestions) {
          const suggestionEl = document.getElementById(
            `suggestion${documentSuggestion.id}`
          );
          const suggestionRemoveEl = document.getElementById(
            `suggestionremove${documentSuggestion.id}`
          );
          if (suggestionEl && suggestionEl.offsetTop > 0) {
            setOffsets((prev) => ({
              ...prev,
              [documentSuggestion.id]: suggestionEl.offsetTop,
            }));
          } else if (suggestionRemoveEl && suggestionRemoveEl.offsetTop > 0) {
            setOffsets((prev) => ({
              ...prev,
              [documentSuggestion.id]: suggestionRemoveEl.offsetTop,
            }));
          }
        }
      });
    };

    calculateOffsets();
    window.addEventListener("load", calculateOffsets);
    return () => {
      window.removeEventListener("load", calculateOffsets);
    };
  }, [selectedDocumentPrompt]);

  return {
    selectedDocumentPrompt,
    isSuggestExpanded,
    setSuggestExpanded,
    documentSuggestionOffsets,
    activeDocumentSuggestionId,
    setActiveDocumentSuggestionId,
    markdownString,
  };
}
