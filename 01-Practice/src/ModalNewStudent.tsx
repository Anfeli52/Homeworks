import { useState } from "react";
import Estudiante from "./Estudiante";

interface Props {
    onClose: () => void;
    onSave: (estudiante: Estudiante) => void;
    classes: {className: string}[];
}

function ModalNewStudent({onClose, onSave, classes}: Props){

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [code, setCode] = useState("");
    const [className, setClass] = useState("");

    const handleGuardar = () => {
        if(name.trim().length === 0 || age < 18 || age > 100 || code.trim().length === 0){
            alert("Por favor llene los campos correctamente");
            return;
        }
        
        onSave(new Estudiante(name, age, code, className));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="title">
                    Nuevo Estudiante
                </div>
                <div className="studentInfo">
                    <label>
                        Nombre
                        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Ej. Juan Pérez"/>
                    </label>
                    <label>
                        Edad
                        <input type="number" onChange={(e) => setAge(parseInt(e.target.value))} placeholder=""/>
                    </label>
                    <label>
                        CÓDIGO
                        <input type="text" onChange={(e) => setCode(e.target.value)} placeholder="Ej: 2329798"/>
                    </label>
                    <label>
                        CLASE
                        <select onChange={(e) => setClass(e.target.value)}>
                            {classes.map((item, index) => (
                                <option key={index} value={item.className}> {item.className}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="model-actions">
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

export default ModalNewStudent;