import { useState } from "react";
import { useAuth } from "../context/AuthContext";


export const RegisterPage = () => {

    const [form, setForm] = useState({email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const { register } = useAuth();

    const handleRegister = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        if(form.email.trim() === "" || form.password.trim() === "") {
            setErrorMsg("El correo y la contraseña son obligatorios.");
            return;
        }

        if(form.password.length < 8) {
            setErrorMsg("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        try {
            await register(form);
            alert("Usuario creado. Ahora puedes loguearte.");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Error desconocido al registrar";
            setErrorMsg(message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Registro de Usuario</h2>
                <p className="auth-subtitle">Crea tu cuenta para comenzar.</p>

                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                <form className="auth-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Correo</label>
                        <input className="input" type="text" placeholder="Correo electrónico" onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input className="input" type="password" placeholder="Crea una contraseña" onChange={e => setForm({ ...form, password: e.target.value })} />
                    </div>

                    <button className="btn btn-primary" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}