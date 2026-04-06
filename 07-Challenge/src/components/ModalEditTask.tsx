import { useState } from 'react';
import { useTask, type Task } from '../context/TaskContext';
import '../styles/modal.scss';

interface ModalEditTaskProps {
    task: Task | null;
    onClose: () => void;
}

export const ModalEditTask = ( { task, onClose }: ModalEditTaskProps ) => {

    const [title, setTitle] = useState(task ? task.title : "");
    const [description, setDescription] = useState(task ? task.description : "");
    const {updateTask} = useTask();

    const handleSaveChanges = async (e: React.SubmitEvent) =>  {
        e.preventDefault();
        if(title.trim() === "" || description.trim() === "") {
            alert("El título y la descripción no pueden estar vacíos.");
            return;
        }
        if(task) {
            try {
                await updateTask(task.id, { title, description });
            } catch (error) {
                console.error("Error updating task:", error);
            }
        }

        onClose();
    }

    return (
            <div className="modal">
                <div className="modal-content">
                    <h2>Editar Tarea</h2>
                    {task ? (
                        <form className="modal-task-details" onSubmit={handleSaveChanges}>
                            <label>Título:</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                            <label>Descripción:</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                            <label>Estado:</label>
                            <input type="text" value={task.completed ? "Completada" : "Pendiente"} readOnly />

                            <button type="submit">Guardar Cambios</button>
                        </form>
                    ) : (
                        <p>No se encontró la tarea.</p>
                    )}
                    <button className="modal-close" onClick={onClose}>Cerrar</button>
                </div>
            </div>
    );
}