import { useState } from "react";
import type LinkedList from "./LinkedList";
import studentsImage from './assets/studentPicture.webp';

interface Props {
    list: LinkedList;
    onClose: () => void;
}

function ModalCurrentStudents({ list, onClose }: Props) {
    const [currentNode, setCurrentNode] = useState(list.head);

    const nextStudent = () => {
        console.log("Esta mierda está funcionanado")
        if (currentNode && currentNode.next) {
            setCurrentNode(currentNode.next);
        }
    };
    if (!currentNode) return null;

    return (
        <div className="modal-overlay">
            <div className="student-card">
                <button className="btn-close-absolute" onClick={onClose}>x</button>
                
                <div className="student-image-container">
                    <img src={studentsImage} alt="Perfil" />
                </div>

                <div className="student-info">
                    <h3>{currentNode.value.getName()}</h3>
                    
                    <div className="student-data-grid">
                        <div>
                            <span>Edad</span>
                            <b>{currentNode.value.getAge()} años</b>
                        </div>
                        <div>
                            <span>Código</span>
                            <b>#{currentNode.value.getCode()}</b>
                        </div>
                        <div style={{ gridColumn: "span 2", marginTop: "8px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                            <span>Clase Matriculada</span>
                            <b style={{ color: "var(--primary)" }}>{currentNode.value.getclassName()}</b>
                        </div>
                    </div>

                    <div className="controls" style={{marginTop: '20px', width: '100%'}}>
                        <button 
                            className="btn-save" style={{width: '100%', opacity: currentNode.next ? 1 : 0.4}} onClick={nextStudent} disabled={!currentNode.next}> 
                            {currentNode.next ? "Siguiente Estudiante →" : "Fin de la lista"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCurrentStudents;