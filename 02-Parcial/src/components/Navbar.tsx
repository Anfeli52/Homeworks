import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const {user, logout} = useAuth();

    return (
        <nav className="navbar">
            <h2 className="navbar__brand">
                {user ? (
                    user.email ?? "Usuario"
                ) : (
                    <>
                    </>
                )}
            </h2>

            <div className="navbar__actions">
                {user ? (
                <>
                    <button onClick={logout} className="btn btn-danger">
                        Cerrar Sesión
                    </button>
                </>
                ) : (
                <>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Registro</Link>
                </>
                )}
            </div>
        </nav>
    );
}