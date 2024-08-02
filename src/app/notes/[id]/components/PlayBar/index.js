// components/Playbar.js

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./styles.module.css";

// const TextLoop = ({ text, duration }) => {
//   const controls = useAnimation();
//   const textRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const textWidth = textRef.current.offsetWidth;
//     const containerWidth = containerRef.current.offsetWidth;

//     controls.start({
//       x: [0, textWidth + 50],
//       transition: {
//         x: {
//           repeat: Infinity,
//           repeatType: "loop",
//           duration: duration,
//           ease: "linear",
//         },
//       },
//     });
//   }, [controls, duration]);

//   return (
//     <div className="text-loop-container" ref={containerRef}>
//       <motion.div className="text-loop" ref={textRef} animate={controls}>
//         <span className="text-item">{text}</span>
//       </motion.div>
//     </div>
//   );
// };

const PlayIcon = () => (
  <svg
    style={{ height: 16 }}
    width="18"
    height="20"
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.5782 9.14344C17.2235 9.53219 17.2235 10.4678 16.5782 10.8566L2.26604 19.479C1.59955 19.8805 0.75 19.4005 0.75 18.6224V1.3776C0.75 0.599504 1.59955 0.119507 2.26604 0.521037L16.5782 9.14344Z"
      fill="white"
    />
  </svg>
);

const PauseIcon = () => (
  <svg
    style={{ height: 16 }}
    width="17"
    height="22"
    viewBox="0 0 17 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 2C0 0.89543 0.895431 0 2 0H2.82257C3.92714 0 4.82257 0.89543 4.82257 2V19.6129C4.82257 20.7174 3.92714 21.6129 2.82257 21.6129H2C0.895431 21.6129 0 20.7174 0 19.6129V2Z"
      fill="white"
    />
    <path
      d="M11.252 2C11.252 0.89543 12.1474 0 13.252 0H14.0745C15.1791 0 16.0745 0.89543 16.0745 2V19.6129C16.0745 20.7174 15.1791 21.6129 14.0745 21.6129H13.252C12.1474 21.6129 11.252 20.7174 11.252 19.6129V2Z"
      fill="white"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginTop: -3, height: 16 }}
  >
    <path
      d="M19.1306 21.0911L6.09683 8.05736L7.85732 6.29688L20.8911 19.3306L19.1306 21.0911ZM7.84703 21.0911L6.09684 19.3409L19.1409 6.29688L20.8911 8.04707L7.84703 21.0911Z"
      fill="white"
    />
  </svg>
);

const Playbar = ({
  playing,
  play,
  pause,
  isAudioMode,
  trackName,
  togglePlaybackRate,
  playbackRate,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    // Slide up animation when component mounts
    if (isAudioMode) {
      controls.start({
        y: 0,
        transition: { duration: 0.5 },
      });
    } else {
      controls.start({
        y: 100,
        transition: { duration: 0.5 },
      });
    }
  }, [controls, isAudioMode]);

  return (
    <motion.div
      className={styles.container}
      initial={{ y: 100 }}
      animate={controls}
    >
      <div className={styles.title}>Transcript | {trackName}</div>
      <div className={styles.controls}>
        <div onClick={togglePlaybackRate}>{playbackRate}x</div>
        {playing ? (
          <div onClick={pause} className={styles.controlButton}>
            <PauseIcon />
          </div>
        ) : (
          <div onClick={play} className={styles.controlButton}>
            <PlayIcon />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Playbar;
