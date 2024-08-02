import { useEffect, useState } from "react";
import Image from "next/image";
import cs from "classnames";
import MSuggestIcon from "/public/msuggest-icon.png";
import styles from "./styles.module.css";
import { useSubmitDocumentPrompt } from "@/app/api";
import { ThreeDots } from "react-loader-spinner";

const CHATINPUT_ID = "chatinput";
const MSUGGEST_CONTAINER_ID = "msuggest_container";
const EXPANDED_CONTAINER_HEIGHT = 296;
const INIT_TEXT_INPUT_HEIGHT = 64;
const MAX_INPUT_HEIGHT_CUTOFF = 100;

const ChatInput = ({ noteId }) => {
  const [inputValue, setInputValue] = useState("");

  const { acceptDocumentSuggestion, loading } = useSubmitDocumentPrompt({
    promptString: inputValue,
    noteId,
  });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue("");
    acceptDocumentSuggestion();
    // Perform any action with the inputValueinputValue, like sending it to an API
  };

  // useEffect(() => {
  //   const element = document.getElementsByTagName("textarea")[0];
  //   if (!element) return;
  //   element.style.height = `${element.scrollHeight}px`;
  //   element.addEventListener("input", (event) => {
  //     const parentContainer = document.getElementById(MSUGGEST_CONTAINER_ID);
  //     if (event.target.value === "") {
  //       event.target.style.height = "auto";
  //       event.target.style.height = `${INIT_TEXT_INPUT_HEIGHT}px`;
  //       parentContainer.style.height = `${EXPANDED_CONTAINER_HEIGHT}px`;
  //     }

  //     if (Number(event.target.scrollHeight) > MAX_INPUT_HEIGHT_CUTOFF) return;
  //     parentContainer.classList.remove(styles.transitiondims);
  //     event.target.style.height = "auto";
  //     event.target.style.height = `${event.target.scrollHeight}px`;
  //     parentContainer.style.height = `${
  //       EXPANDED_CONTAINER_HEIGHT -
  //       INIT_TEXT_INPUT_HEIGHT +
  //       event.target.scrollHeight
  //     }px`;
  //     parentContainer.classList.add(styles.transitiondims);
  //   });
  // });

  return (
    <div>
      <form onSubmit={handleSubmit} className="row" style={{ marginBottom: 8 }}>
        {loading && (
          <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="#5157E2"
            radius="9"
            ariaLabel="three-dots-loading"
            style={{ margin: "auto" }}
            wrapperClass=""
          />
        )}
        <textarea
          autoFocus
          value={inputValue}
          onChange={handleInputChange}
          placeholder="chat with the AI for suggestions..."
          className={styles.chatinput}
          id="CHATINPUT_ID"
          rows={4}
          style={{ height: INIT_TEXT_INPUT_HEIGHT }}
        />
      </form>
      <button
        onClick={handleSubmit}
        className="flexbutton"
        style={{
          margin: "auto",
          border: "1px solid black",
          padding: 8,
          fontSize: 16,
        }}
      >
        Submit
      </button>
      <div style={{ height: 8 }} />
    </div>
  );
};

const MSuggest = ({
  documentPrompt,
  loading,
  expanded,
  setExpanded,
  noteId,
}) => {
  const onClick = () => {
    if (expanded) {
      // setSelectedDocumentPrompt(null);
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  const makeOnClickDocumentPrompt = (documentPrompt) => () => {};

  const containerStyle = expanded
    ? {
        height: EXPANDED_CONTAINER_HEIGHT,
        width: 250,
      }
    : {
        height: 44,
        width: 136,
      };

  return (
    <div
      id={MSUGGEST_CONTAINER_ID}
      className={cs(styles.msuggest, styles.transitiondims)}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid #5157E2",
        borderRadius: 30,
        background: "white",
        margin: "auto",
        ...containerStyle,
      }}
    >
      <div
        style={{
          // height: "100%",
          width: "100%",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          position: "white",
        }}
      >
        <button
          className={cs(
            "flexbutton",
            styles.msuggestbutton,
            expanded && styles.expanded
          )}
          onClick={onClick}
        >
          <Image
            src={MSuggestIcon}
            alt="monolog icon"
            height={22}
            width={28}
            style={{
              // marginTop: "auto"7
              // marginBottom: "auto",
              // marginRight: "auto",
              marginTop: -7.2,
            }}
          />
          <div style={{ width: 6 }} />
          <span
            style={{
              fontSize: 16,
              color: "#5157E2",
              fontWeight: "700",
              // marginTop: "auto",
              // marginBottom: "auto",
              // marginLeft: "auto",
            }}
          >
            Suggest
          </span>
        </button>
      </div>
      {expanded && (
        <div
          className={cs("col", "fadein")}
          style={{
            flex: 1,
          }}
        >
          {documentPrompt && (
            <div style={{ padding: 16, marginBottom: "auto" }}>
              <button
                className={cs(
                  "flexbutton",
                  styles.documentpromptbutton,
                  // isSelected &&
                  styles.selected
                )}
                key={documentPrompt.id}
                onClick={makeOnClickDocumentPrompt(documentPrompt)}
                // disabled={isSelected}
              >
                <span>{documentPrompt.promptString} →</span>
              </button>
            </div>
          )}
          <ChatInput noteId={noteId} />
        </div>
      )}
    </div>
  );
};

const DraftDocumentLeftBar = ({
  draft,
  selectedDocumentPrompt,
  expanded,
  setExpanded,
}) => {
  return (
    <div style={{ width: 250 + 40, padding: "100px 20px" }}>
      <MSuggest
        documentPrompt={draft.documentPrompt}
        selectedDocumentPrompt={selectedDocumentPrompt}
        expanded={expanded}
        setExpanded={setExpanded}
        noteId={draft.noteId}
      />
      {/* <div>Hi</div> */}
    </div>
  );
};

export default DraftDocumentLeftBar;
