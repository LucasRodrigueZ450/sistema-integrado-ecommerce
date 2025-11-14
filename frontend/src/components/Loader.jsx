function Loader() {
  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        marginTop: "30px"
      }}
    >
      <div style={{ fontSize: "2em" }}>⏳</div>
      <h3>Carregando...</h3>
      <p>Aguarde um momento</p>
    </div>
  );
}

export default Loader;
