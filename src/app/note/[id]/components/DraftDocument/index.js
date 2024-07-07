import { useRemarkSync } from "react-remark";
import { LEFT_BAR_HEIGHT, TOP_BAR_HEIGHT } from "../LeftBar";
import styles from "./styles.module.css";

const CopyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_978_185)">
      <path
        d="M4.16675 12.4998H3.33341C2.89139 12.4998 2.46746 12.3242 2.1549 12.0117C1.84234 11.6991 1.66675 11.2752 1.66675 10.8332V3.33317C1.66675 2.89114 1.84234 2.46722 2.1549 2.15466C2.46746 1.8421 2.89139 1.6665 3.33341 1.6665H10.8334C11.2754 1.6665 11.6994 1.8421 12.0119 2.15466C12.3245 2.46722 12.5001 2.89114 12.5001 3.33317V4.1665M9.16675 7.49984H16.6667C17.5872 7.49984 18.3334 8.24603 18.3334 9.1665V16.6665C18.3334 17.587 17.5872 18.3332 16.6667 18.3332H9.16675C8.24627 18.3332 7.50008 17.587 7.50008 16.6665V9.1665C7.50008 8.24603 8.24627 7.49984 9.16675 7.49984Z"
        stroke="#415A61"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_978_185">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const DraftDocument = ({ note }) => {
  const draftMarkdownReactContent = useRemarkSync(note?.draft.markdown);

  return (
    <div>
      <div
        className="row"
        style={{
          height: `calc(100vh - ${TOP_BAR_HEIGHT + 28}px)`,
          background: "white",
          overflowY: "scroll",
          display: "flex",
          width: `calc(100vw - ${LEFT_BAR_HEIGHT + 40}px)`,
          borderRadius: 5,
        }}
      >
        <div style={{ width: 220, height: 1 }} />
        <div
          className="col"
          style={{
            width: 700,
            paddingTop: 48,
            margin: "0 auto",
          }}
        >
          <div
            className="row"
            style={{
              borderTopLeftRadius: 4,
              width: "100%",
              height: 40,
              alignItems: "center",
              // padding: "0 14px",
              flexShrink: 0,
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                fontWeight: "600",
                color: "#415A61",
                fontSize: 20,
                width: "80%",
              }}
            >
              {note?.title}
            </h2>
            <div className="row" style={{ marginTop: 0 }}>
              <CopyIcon />
              <div style={{ width: 6 }} />
              <div
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: "#415A61",
                  marginTop: "auto",
                }}
              >
                Copy Text
              </div>
            </div>
          </div>
          <div className={styles.markdowndoc}>{draftMarkdownReactContent}</div>
        </div>
        <div style={{ width: 220, height: 1 }} />
      </div>
    </div>
  );
};

export default DraftDocument;
