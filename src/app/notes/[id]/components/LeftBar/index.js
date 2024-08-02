import { useState, useEffect } from "react";
import cs from "classnames";
import axios from "axios";
import styles from "./styles.module.css";
import { formatDate, formatTime } from "@/app/util";
import { useNotes } from "@/app/api";
import Link from "next/link";

export const TOP_BAR_HEIGHT = 56;
export const LEFT_BAR_HEIGHT = 220;

const ChevronUpIcon = () => (
  <div style={{ marginTop: -0.75 }}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.6875 7.1875L10 12.8125L15.3125 7.1875"
        stroke="#808080"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
);

const LeftBar = ({ selectedNoteId, notes }) => {
  const draftNotes = notes.filter((n) => n.drafts.length > 0);
  const uploadedNotes = notes.filter((n) => n.drafts.length === 0);

  return (
    <div
      className={styles.container}
      style={{
        borderRight: "1px solid #E6E6E6",
        width: LEFT_BAR_HEIGHT,
        top: TOP_BAR_HEIGHT + 13,
      }}
    >
      {/* <div style={{ height: 9 }} /> */}
      <div className={styles.notesgroup}>
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            fontWeight: "400",
            // alignItems: "center",
          }}
        >
          <h5 style={{ fontWeight: "500", color: "#808080" }}>Draft Notes</h5>
          <ChevronUpIcon />
        </div>
        <div
          style={{
            width: "100%",
            height: 1,
            background: "#D9D9D9",
            margin: "1px 0 10px",
          }}
        />
        <div className="col">
          {draftNotes.map((note) => {
            const isSelected = selectedNoteId.toString() === note.id.toString();
            const truncatedTitle = note?.title;
            // || note?.title?.slice(0, 22) + "…";
            return (
              <Link
                href={`/notes/${note.id}`}
                className={cs(
                  styles.note__listItem,
                  isSelected && styles.note__listItem_selected
                )}
                style={{
                  height: 80,

                  // border: "1px solid #B5C5BD",
                }}
                key={note.id}
              >
                <div>
                  <h3>{truncatedTitle}</h3>
                  <div style={{ height: 2.5 }} />
                  <div className="row">
                    <span>{formatDate(note.createdAt)}</span>
                    <span style={{ margin: "0 2.5px" }}>•</span>
                    <span>{formatTime(note.duration)}</span>
                  </div>
                </div>
                <div
                  style={{
                    width: "80%",
                    height: 1,
                    background: isSelected ? "none" : "#E6E6E6",
                    marginLeft: "auto",
                    marginTop: 12,
                  }}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div style={{ height: 10 }} />
      <div className={styles.notesgroup} style={{ flex: 1 }}>
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            fontWeight: "400",
            // alignItems: "center",
          }}
        >
          <h5 style={{ fontWeight: "500", color: "#808080" }}>
            Uploaded Notes
          </h5>
          <ChevronUpIcon />
        </div>
        <div
          style={{
            width: "100%",
            height: 1,
            background: "#D9D9D9",
            margin: "1px 0 10px",
          }}
        />
        <div className="col">
          {uploadedNotes.map((note) => {
            const isSelected = selectedNoteId.toString() === note.id.toString();
            return (
              <Link
                href={`/notes/${note.id}`}
                className={cs(
                  styles.note__listItem,
                  isSelected && styles.note__listItem_selected
                )}
                key={note.id}
              >
                <div>
                  <h3>{note.title}</h3>
                  <div style={{ height: 2.5 }} />
                  <div className="row">
                    <span>{formatDate(note.createdAt)}</span>
                    <span style={{ margin: "0 2.5px" }}>•</span>
                    <span>{formatTime(note.duration)}</span>
                  </div>
                </div>
                <div
                  style={{
                    width: "80%",
                    height: 1,
                    background: isSelected ? "none" : "#E6E6E6",
                    marginLeft: "auto",
                    marginTop: 12,
                  }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
