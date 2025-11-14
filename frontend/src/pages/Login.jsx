import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MessageBox from "../components/MessageBox";

function Login() {
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);

    // ⬇⬇⬇ AQUI ESTÁ O QUE FALTAVA!
    if (result.success) {
      navigate("/products");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2>🔐 Login</h2>

          {error && <MessageBox type="error">{error}</MessageBox>}

          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input 
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
