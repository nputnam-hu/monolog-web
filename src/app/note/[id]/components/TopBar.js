const { TOP_BAR_HEIGHT } = require("./LeftBar");

const TopBar = () => {
  return (
    <div
      style={{
        height: TOP_BAR_HEIGHT,
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 12,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        padding: "22px 14px 12px",
        background: "white",
        position: "fixed",
        top: 0,
        width: "100vw",
        zIndex: 2,
        left: 0,
      }}
    >
      <h2 style={{ fontWeight: "600", fontSize: 22 }}>Notes</h2>
      <div />
    </div>
  );
};

export default TopBar;
