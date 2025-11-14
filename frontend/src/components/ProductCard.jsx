function ProductCard({ product, onEdit }) {
  return (
    <div className="product-card">
      
      <div className="product-header">
        <h3>{product.name}</h3>
        <span className="product-category">{product.category}</span>
      </div>

      <p className="product-description">{product.description}</p>

      <span className="stock-badge">
        📦 {product.stock} em estoque
      </span>

      <div className="product-footer">
        <span className="product-price">
          R$ {typeof product.price === "number" ? product.price.toFixed(2) : "0.00"}
        </span>

        <div style={{ display: "flex", gap: "10px" }}>
          {/* BOTÃO DE EDITAR */}
          <button 
            className="btn-secondary" 
            onClick={() => onEdit(product)}
          >
            ✏ Editar
          </button>

          <button className="btn btn-cart">🛒 Adicionar</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
