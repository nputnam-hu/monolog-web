const { TOP_BAR_HEIGHT } = require("./LeftBar");

const TopBar = () => {
  return (
    <div
      style={{
        height: TOP_BAR_HEIGHT,
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 12,
        borderBottom: "1px solid #D9D9D9",
        padding: "18px 16px 2px",
        background: "white",
        position: "fixed",
        top: 0,
        width: "100vw",
        zIndex: 2,
        left: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      }}
    >
      <h2
        style={{
          color: "#415A61",
          fontWeight: "600",
          fontSize: 22,
          marginBottom: 4,
        }}
      >
        Notes
      </h2>
      <div />
    </div>
  );
};

export default TopBar;
