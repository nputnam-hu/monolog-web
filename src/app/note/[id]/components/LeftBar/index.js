import { useState, useEffect } from "react";
import cs from "classnames";
import axios from "axios";
import styles from "./styles.module.css";
import { formatDate, formatTime } from "@/app/util";
import { useNotes } from "@/app/hooks";
import Link from "next/link";

export const TOP_BAR_HEIGHT = 60;
export const LEFT_BAR_HEIGHT = 220;

const ChevronDown = () => (
  <div>
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginTop: 8 }}
    >
      <path
        d="M4.6875 7.62744L10 13.2524L15.3125 7.62744"
        stroke="#222222"
        stroke-width="2.4375"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
);

const MicrophoneIcon = () => (
  <div>
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginTop: 4 }}
    >
      <path
        d="M14.16 16.2729H16.66M16.66 16.2729H19.16M16.66 16.2729V13.7729M16.66 16.2729V18.7729"
        stroke="#222222"
        stroke-width="1.625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.16675 4.60645C9.16675 3.22573 8.04746 2.10645 6.66675 2.10645C5.28604 2.10645 4.16675 3.22573 4.16675 4.60645V9.60645C4.16675 10.9872 5.28604 12.1064 6.66675 12.1064C8.04746 12.1064 9.16675 10.9872 9.16675 9.60645V4.60645Z"
        fill="#222222"
        stroke="#222222"
        stroke-width="1.625"
      />
      <path
        d="M0.833374 8.77295V9.60628C0.833374 11.1534 1.44796 12.6371 2.54192 13.7311C3.63588 14.825 5.11961 15.4396 6.66671 15.4396M6.66671 15.4396C8.2138 15.4396 9.69754 14.825 10.7915 13.7311C11.8855 12.6371 12.5 11.1534 12.5 9.60628V8.77295M6.66671 15.4396V18.7729M6.66671 18.7729H4.16671M6.66671 18.7729H9.16671"
        stroke="#222222"
        stroke-width="1.625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
);

const LeftBar = ({ selectedNoteId, notes }) => {
  return (
    <div
      className={styles.container}
      style={{
        borderRight: "1px solid #E6E6E6",
        width: LEFT_BAR_HEIGHT,
        top: TOP_BAR_HEIGHT + 12,
      }}
    >
      <div className={styles.content}>
        <div style={{ height: 9 }} />
        <div>
          {notes.map((note) => {
            const isSelected = selectedNoteId.toString() === note.id.toString();
            return (
              <Link
                href={`/note/${note.id}`}
                className={cs(
                  styles.note__listItem,
                  isSelected && styles.note__listItem_selected
                )}
                key={note.id}
              >
                <div>
                  <h3>{note.title}</h3>
                  <div style={{ height: 2 }} />
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
