import { useState } from "react";
import { useAuth } from "../context/AuthContext";


export const LoginPage = () => {
    
    const { login } = useAuth();

    const [form, setForm] = useState({ email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await login(form);
        } catch (error) {
            setErrorMsg("Error en las credenciales");
        }
    };
    
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Iniciar Sesión</h2>
                <p className="auth-subtitle">Accede a tu cuenta para ver tus tareas.</p>

                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Correo</label>
                        <input
                            className="input"
                            type="email"
                            placeholder="Tu correo"
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="••••••••"
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    <button className="btn btn-primary" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}