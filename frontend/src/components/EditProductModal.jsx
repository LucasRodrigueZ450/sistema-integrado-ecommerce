import React, { useState } from "react";
import "./Modal.css";

// ✅ Função que normaliza preços
function formatPrice(value) {
  if (!value) return 0;

  return Number(
    String(value)
      .replace(/\s/g, "")   // remove espaços
      .replace("R$", "")    // remove R$
      .replace(/\./g, "")   // remove pontos de milhares
      .replace(",", ".")    // troca vírgula por ponto
  );
}

function EditProductModal({ product, onClose, onSave }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [image, setImage] = useState(product.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedPrice = formatPrice(price);

    console.log("SALVANDO PRODUTO NORMALIZADO:", normalizedPrice);

    onSave({
      ...product,
      name,
      description,
      price: normalizedPrice,
      category,
      stock: Number(stock),
      image,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>✏ Editar Produto</h2>

        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Descrição:</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Preço:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label>Categoria:</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <label>Estoque:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <label>URL da Imagem:</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="btn">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
