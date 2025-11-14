import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const hideMenu =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="main-header">
      <div className="container">
        <div className="header-content">
          <h1>🛒 Loja UNIFOR</h1>
          <p>Sistema de E-commerce Integrado</p>
        </div>

        {!hideMenu && (
          <nav className="main-nav">
            <Link to="/products" className="nav-btn">
              🏠 Produtos
            </Link>

            {user && (
              <>
                {/* Novo botão para criar produto */}
                <Link to="/products/create" className="nav-btn">
                  ➕ Criar Produto
                </Link>

                <button className="nav-btn" onClick={logout}>
                  🚪 Sair
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
