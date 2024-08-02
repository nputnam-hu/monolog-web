import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import cs from "classnames";
import MSuggestIcon from "/public/msuggest-icon.png";
import styles from "./styles.module.css";
import {
  useAcceptDocumentSuggestion,
  useRejectDocumentSuggestion,
} from "@/app/api";
import { TOP_BAR_HEIGHT } from "../LeftBar";

const RejectIcon = ({ active }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: active ? "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.2))" : "none",
    }}
  >
    <line
      x1="5.66498"
      y1="13.9262"
      x2="13.5128"
      y2="6.07839"
      stroke="black"
      stroke-width={active ? "2" : "1.5"}
    />
    <line
      x1="5.91361"
      y1="6.09259"
      x2="13.3484"
      y2="13.9404"
      stroke="black"
      stroke-width={active ? "2" : "1.5"}
    />
    <circle
      cx="9.5"
      cy="9.5"
      r="8.75"
      stroke="black"
      stroke-width={active ? "2" : "1.5"}
    />
  </svg>
);

const AcceptIcon = ({ active }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: active
        ? "drop-shadow(0px 0px 5px rgba(81, 87, 226, 0.2))"
        : "none",
    }}
  >
    <line
      x1="7.46967"
      y1="13.3173"
      x2="14.4697"
      y2="6.31733"
      stroke={active ? "#5157E2" : "black"}
      stroke-width={active ? "2" : "1.5"}
    />
    <line
      x1="4.53033"
      y1="9.46967"
      x2="8.45477"
      y2="13.3941"
      stroke={active ? "#5157E2" : "black"}
      stroke-width={active ? "2" : "1.5"}
    />
    <circle
      cx="9.5"
      cy="9.5"
      r="8.75"
      // fill={active ? "#5157E2" : ""}
      stroke={active ? "#5157E2" : "black"}
      stroke-width={active ? "2" : "1.5"}
    />
  </svg>
);

const Suggestion = ({
  documentSuggestion,
  setActiveDocumentSuggestionId,
  activeDocumentSuggestionId,
  documentSuggestionOffsets,
}) => {
  const { rejectDocumentSuggestion } = useRejectDocumentSuggestion(
    documentSuggestion.id
  );
  const { acceptDocumentSuggestion } = useAcceptDocumentSuggestion(
    documentSuggestion.id
  );

  const onMouseEnter = () =>
    setActiveDocumentSuggestionId(documentSuggestion.id);
  const onMouseLeave = () => setActiveDocumentSuggestionId(null);

  const isActive = activeDocumentSuggestionId === documentSuggestion.id;
  const isAccepted = documentSuggestion.status === "accepted";
  const isRejected = documentSuggestion.status === "rejected";
  // console.log({
  //   id: documentSuggestion.id,
  //   : documentSuggestionOffsets[documentSuggestion.id],
  // });
  return (
    <div
      style={{ top: documentSuggestionOffsets[documentSuggestion.id] - 80 }}
      className={cs(
        styles.suggestion,
        isAccepted && styles.accepted,
        isRejected && styles.rejected,
        isActive && styles.active
      )}
      key={documentSuggestion.id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h3>{documentSuggestion.suggestionHeader}</h3>
      <div
        style={{
          height: 1,
          width: "100%",
          margin: "6px 0",
          background: "#E6E6E6",
        }}
      />
      <p>{documentSuggestion.suggestionDescription}</p>
      <div className="row" style={{ marginTop: 14, marginBottom: 2 }}>
        <button
          className="flexbutton"
          onClick={rejectDocumentSuggestion}
          disabled={isRejected}
        >
          <RejectIcon active={isRejected} />
        </button>
        <div style={{ width: 8 }} />
        <button
          className="flexbutton"
          onClick={acceptDocumentSuggestion}
          disabled={isAccepted}
        >
          <AcceptIcon active={isAccepted} />
        </button>
      </div>
    </div>
  );
};

const DraftDocumentRightBar = ({
  selectedDocumentPrompt,
  setActiveDocumentSuggestionId,
  activeDocumentSuggestionId,
  documentSuggestionOffsets,
}) => {
  return (
    <div
      className={cs("col", "fadein")}
      style={{
        width: 286,
        // paddingRight: "20px",
        paddingLeft: 20,
        paddingTop: 44,
        // height: `calc(100vh - ${TOP_BAR_HEIGHT + 25}px)`,
        height: `100%`,
        position: `relative`,
      }}
    >
      <div
        className="row"
        style={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <Image
          src={MSuggestIcon}
          alt="monolog icon"
          height={22}
          width={28}
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            // marginRight: "auto",
            // marginTop: -7.2,
          }}
        />
        <h2 style={{ fontSize: 20, color: "#5157E2", paddingLeft: 8 }}>
          {selectedDocumentPrompt.promptString}
        </h2>
      </div>
      <br />
      {selectedDocumentPrompt.documentSuggestions.map((documentSuggestion) => (
        <Suggestion
          key={documentSuggestion.id}
          documentSuggestion={documentSuggestion}
          activeDocumentSuggestionId={activeDocumentSuggestionId}
          setActiveDocumentSuggestionId={setActiveDocumentSuggestionId}
          documentSuggestionOffsets={documentSuggestionOffsets}
        />
      ))}
    </div>
  );
};

export default DraftDocumentRightBar;
