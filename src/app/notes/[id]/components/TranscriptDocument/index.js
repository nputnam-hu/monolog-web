import { act, useEffect, useState } from "react";
import moment from "moment";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { TOP_BAR_HEIGHT } from "../LeftBar";
import styles from "./styles.module.css";
import Playbar from "../PlayBar";

const TranscriptBadge = () => {
  return (
    <div
      className="row"
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "#906495",
        borderRadius: 4,
        padding: "2px 8px",
        height: 20,
        marginTop: 0.5,
      }}
    >
      <span
        style={{
          color: "#EAEAEA",
          fontWeight: "600",
          fontSize: 11,
          marginTop: 1,
        }}
      >
        TRANSCRIPT
      </span>
    </div>
  );
};

const playbackRates = [1, 1.5, 2];

const TranscriptDocument = ({ selectedNote }) => {
  const [isAudioMode, setAudioMode] = useState(false);
  const [activeSegmentId, setActiveSegment] = useState();
  const [position, setPosition] = useState(0);
  const [playbackRateIdx, setPlaybackRateIdx] = useState(0);

  const { load, playing, play, pause, seek, getPosition, setRate } =
    useGlobalAudioPlayer();

  const playbackRate = playbackRates[playbackRateIdx];

  const togglePlaybackRate = () => {
    setPlaybackRateIdx((prevIdx) => {
      setRate(playbackRates[(prevIdx + 1) % 3]);
      return (prevIdx + 1) % 3;
    });
  };

  const makeOnHoverSegment = (segmentId) => () => setActiveSegment(segmentId);
  const onLeaveSegment = () => setActiveSegment(null);
  const makePlayFromSegment = (s) => () => {
    const isPlaying =
      playing && isAudioMode && s.start < position && s.end > position;

    if (isPlaying) {
      pause();
    } else {
      setAudioMode(true);
      seek(s.start);
      play();
    }
  };
  useEffect(() => {
    if (selectedNote?.audioUrl) {
      load(selectedNote.audioUrl);
    }
  }, [selectedNote?.audioUrl, load]);
  useEffect(() => {
    setInterval(() => {
      const _position = getPosition();
      setPosition(_position);
    }, 250);
  });

  return (
    <div
      className={styles.transcriptdoc}
      style={{ height: `calc(100vh - ${TOP_BAR_HEIGHT + 16}px)` }}
    >
      <div
        className="row"
        style={{
          borderTopLeftRadius: 4,
          width: "100%",
          height: 40,
          background: "#E8E8E8",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <span style={{ fontWeight: "", color: "#333" }}>
          {selectedNote?.title}
        </span>
        <div style={{ width: 6 }} />
        <TranscriptBadge />
      </div>
      <div style={{ padding: "12px 14px", overflowY: "scroll" }}>
        {selectedNote?.paragraphs?.map((paragraph) => (
          <>
            <div
              style={{ alignItems: "baseline" }}
              // className="row"
            >
              {paragraph.map((s) => {
                const segmentId = `${paragraph.id}-${s.id}`;
                const isPlaying =
                  isAudioMode && s.start < position && s.end > position;
                const isActive = isPlaying || segmentId === activeSegmentId;
                return (
                  <span
                    onClick={makePlayFromSegment(s)}
                    key={segmentId}
                    onMouseEnter={makeOnHoverSegment(segmentId)}
                    onMouseLeave={onLeaveSegment}
                    // className="row"
                    // style={{
                    //   flexWrap: "row",
                    // }}
                    style={
                      isActive
                        ? { background: "#c1c1c1", cursor: "pointer" }
                        : {}
                    }
                  >
                    {/* <span > */}
                    {s.text}
                    {/* </span> */}
                  </span>
                );
              })}
            </div>
            <br />
          </>
        ))}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: 520,
        }}
      >
        <Playbar
          playing={playing}
          play={play}
          pause={pause}
          isAudioMode={isAudioMode}
          trackName={selectedNote?.title}
          togglePlaybackRate={togglePlaybackRate}
          playbackRate={playbackRate}
        />
        <div
          className="row"
          style={{
            background: "white",
            justifyContent: "space-between",
            // borderTop: "1px solid #E1E1E1",
            border: "1px solid #E1E1E1",
            padding: "5px 12px",
            height: 28,
          }}
        >
          <span
            style={{
              fontFamily: "Times New Roman",
              fontSize: 14.5,
            }}
          >
            {moment(selectedNote?.createdAt).format("l H:mm")}
          </span>
          {selectedNote?.transcript && (
            <span
              style={{
                fontFamily: "Times New Roman",
                fontSize: 14.5,
              }}
            >
              {selectedNote.transcript.fullText.split(" ").length} tokens
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptDocument;
