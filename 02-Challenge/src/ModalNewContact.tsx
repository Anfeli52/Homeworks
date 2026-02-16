import { useState } from "react";

interface Props {
    onClose: () => void;
    onSave: (contact: {nombre: string, Telefono: string}) => void;
}

function ModalNewContact({ onClose, onSave }: Props) {

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");

    const handleGuardar = () => {
        if(nombre.trim().length === 0 || telefono.trim().length === 0) {
            alert("Por favor llene los campos correctamente");
            return;
        }

        const soloNumeros = /^\d+$/;
        if (!soloNumeros.test(telefono)) {
            alert("El teléfono solo debe contener números (sin espacios ni letras).");
            return;
        }

        onSave({nombre, Telefono: telefono})
    };

    return (
        <div className="modal-overlay"> 
            <div className="modal-content">
                <div className="title" style={{fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', color: 'white'}}> 
                    Nuevo Contacto 
                </div>
                <div className="contactInfo">
                    <label> 
                        NOMBRE 
                        <input type="text" onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Juan Pérez"/>
                    </label>
                    <label> 
                        TELÉFONO 
                        <input type="number" onChange={(e) => setTelefono(e.target.value)} placeholder="Ej. +57 300..."/>
                    </label>
                </div>

                <div className="modal-actions">
                    <button onClick={handleGuardar} className="btn-save">
                        Guardar
                    </button>
                    <button onClick={onClose} className="btn-cancel">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalNewContact;