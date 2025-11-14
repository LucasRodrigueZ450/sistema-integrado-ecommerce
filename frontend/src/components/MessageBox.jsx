function MessageBox({ children, type = "info" }) {
  const colors = {
    info:   { bg: "#dfe9ff", color: "#2c3e50" },
    success:{ bg: "#e8f6f3", color: "#1e8449" },
    error:  { bg: "#f8d7da", color: "#b71c1c" }
  };

  const style = colors[type] || colors.info;

  return (
    <div
      style={{
        background: style.bg,
        color: style.color,
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontWeight: "600",
        textAlign: "center",
        border: "1px solid rgba(0,0,0,0.1)"
      }}
    >
      {children}
    </div>
  );
}

export default MessageBox;
