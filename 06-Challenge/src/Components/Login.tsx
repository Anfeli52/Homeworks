import { useState } from "react";
import { useAuth } from "../Contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const validateLogin = (e: React.SubmitEvent) => {
        e.preventDefault();

        if(login(email, password)){
            navigate('/home');
        } else {
            alert('Usuario o contraseña incorrectos')
        }
    };

    return (
        <div className="login-section">
            <div className="login-container">
                <h2 className="login-title">Iniciar Sesión</h2>
                <form className="login-form" onSubmit={validateLogin}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" placeholder="usuario@dominio.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input type="password" placeholder="************" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="action-button">
                        <button type="submit"> Iniciar Sesión </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;