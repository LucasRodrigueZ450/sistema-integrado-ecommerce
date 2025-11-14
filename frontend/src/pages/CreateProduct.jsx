import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import MessageBox from "../components/MessageBox";

function CreateProduct() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Você precisa estar logado para criar produtos.");
      return;
    }

    try {
      await productsAPI.create({
        name,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
        image,
      });

      setSuccess("Produto criado com sucesso!");
      setTimeout(() => navigate("/products"), 1500);

    } catch (err) {
      setError(err.response?.data?.error || "Erro ao criar produto");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <form className="form-container" onSubmit={handleSubmit}>

          <h2>📦 Criar Produto</h2>

          {error && <MessageBox type="error">{error}</MessageBox>}
          {success && <MessageBox type="success">{success}</MessageBox>}

          <div className="form-group">
            <label>Nome:</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Descrição:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              style={{ width: "100%", padding: "12px", borderRadius: "8px" }}
              required
            />
          </div>

          <div className="form-group">
            <label>Preço:</label>
            <input 
              type="number" 
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Categoria:</label>
            <input 
              type="text" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Estoque:</label>
            <input 
              type="number" 
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>URL da Imagem:</label>
            <input 
              type="url" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <button className="btn" type="submit">Criar Produto</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
