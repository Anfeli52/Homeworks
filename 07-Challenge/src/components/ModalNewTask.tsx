import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useTask } from "../context/TaskContext";
import "../styles/modal.scss";

interface ModalNewTaskProps {
    onClose: () => void;
}

export const ModalNewTask = ({ onClose }: ModalNewTaskProps) => {

    const { user } = useAuth();
    const { createTask } = useTask();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreateTask = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!user) {
            alert("Debes estar logueado para crear una tarea.");
            navigate('/login');
            return;
        }

        if (title.trim() === "" || description.trim() === "") {
            alert("El título y la descripción de la tarea son obligatorios.");
            return;
        }

        try {
            await createTask({ title, description, user_id: user.uid, completed: false });
        } catch (error) {
            console.error("Error creating task:", error);
        }
        
        onClose();
    }

    return (
        <div>
            <div className="modal">
                <div className="modal-content">
                    <h2>Crear Nueva Tarea</h2>
                    <form onSubmit={handleCreateTask}>
                        <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
                        <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        <button type="submit">Crear</button>
                    </form>
                    <button className="modal-close" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}