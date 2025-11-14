import { useEffect, useState } from "react";
import { productsAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import EditProductModal from "../components/EditProductModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await productsAPI.getAll();
        setProducts(data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSaveProduct = async (updatedProduct) => {
    try {
      console.log("Enviando update para API:", updatedProduct);

      const { data } = await productsAPI.update(
        updatedProduct._id,
        updatedProduct
      );

      // Atualiza estado local com o que voltou da API
      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? data.product || data : p))
      );

      setEditingProduct(null);
      alert("Produto atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao editar:", err);
      alert("Erro ao salvar alterações do produto");
    }
  };

  if (loading) {
    return <h2 style={{ color: "#fff" }}>Carregando...</h2>;
  }

  return (
    <div className="products-container">
      <h2 style={{ marginBottom: "20px", color: "#fff" }}>Produtos</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={() => setEditingProduct(product)}
          />
        ))}
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
