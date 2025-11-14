import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MessageBox from "../components/MessageBox";

function Register() {
  const { register, error, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2>📝 Criar Conta</h2>

          {error && <MessageBox type="error">{error}</MessageBox>}

          <div className="form-group">
            <label>Nome completo:</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

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
              placeholder="Crie uma senha segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              minLength={6}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
