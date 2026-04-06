import type { Task } from '../context/TaskContext';

interface ModalEditTaskProps {
    task: Task | null;
    onClose: () => void;
}

export const ModalEditTask = ( { task, onClose }: ModalEditTaskProps ) => {
    return (
            <div className="modal">
                <div className="modal-content">
                    <h2>Editar Tarea</h2>
                    {task ? (
                        <form className="modal-task-details">
                            <label>Título:</label>
                            <input type="text" value={task.title} readOnly />

                            <label>Descripción:</label>
                            <textarea value={task.description} readOnly></textarea>

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