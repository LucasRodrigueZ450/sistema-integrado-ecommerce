import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <AuthProvider>   {/* ← AGORA FUNCIONA DE VERDADE  */}
      <Header />

      <main className="main-content">
        <Routes>
          {/* Redirecionar raiz */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          {/* Criar Produto (rota protegida) */}
          <Route
            path="/products/create"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </AuthProvider>
  );
}

export default App;
