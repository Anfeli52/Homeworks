import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthProvider";
import "../Styles/navbar.css";


function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">        
            <div className="navbar-action">
                <span>User: <strong>{user?.email}</strong></span>
                <Link to="/library" className="nav-link">Librería</Link>
                <Link to="/atm" className="nav-link">ATM</Link>
                <button onClick={logout} className="btb btb-logout">
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
}

export default Navbar