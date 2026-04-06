import { useEffect, useState } from 'react';
import '../styles/home.scss';
import { useTask } from '../context/TaskContext';
import { ModalNewTask } from '../components/ModalNewTask';
import { ModalEditTask } from '../components/ModalEditTask';
import type { Task } from '../context/TaskContext';

export const Home = () => {

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<Task | null>(null);

    const { result: tasks, getTasks, isPending, error, updateTask } = useTask();

    useEffect(() => {
        getTasks();
        // Se ejecuta solo al montar para cargar tareas iniciales.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleTaskStatus = async (taskId: string, completed: boolean) => {
        try {
            await updateTask(taskId, { completed: !completed });
        } catch (error) {
            console.error("Error al actualizar el estado de la tarea:", error);
        }
    }

    
    return (
        <div className='home-page'>
            {showModal && <ModalNewTask onClose={() => setShowModal(false)} />}
            {showEditModal && <ModalEditTask task={editingTaskId} onClose={() => setShowEditModal(false)} />}

            <h2 className='home-title'>Bienvenido a tu lista de tareas</h2>
            {isPending && <p className="home-no-tasks">Cargando tareas...</p>}
            {error && <p className="home-no-tasks">{error}</p>}
            {!isPending && !error && tasks.length > 0 ? (
                tasks.map(task => (
                    <div key={task.id} className={`home-card ${task.completed ? 'completed' : ''}`}>
                        <h3 className="home-card-title">{task.title}</h3>
                        <p className="home-card-content">{task.description}</p>
                        <div className="home-card-actions">
                            <button className="home-card-edit" aria-label="Editar tarea" title="Editar tarea" onClick={() => {
                                setEditingTaskId(task);
                                setShowEditModal(true);
                            }}>
                                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                                    <path d="M16.86 3.56a2.2 2.2 0 0 1 3.12 0l.46.46a2.2 2.2 0 0 1 0 3.12l-9.98 9.98a1 1 0 0 1-.42.25l-4.05 1.1a.8.8 0 0 1-.98-.98l1.1-4.05a1 1 0 0 1 .25-.42z"></path>
                                    <path d="M14.7 5.7l3.6 3.6"></path>
                                </svg>
                            </button>
                            <button className="home-card-button" onClick={() => toggleTaskStatus(task.id, task.completed)}>
                                {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
                            </button>
                        </div>
                    </div>
                ))
            ) : !isPending && !error ? (
                <p className="home-no-tasks">No tienes tareas aún. ¡Agrega tu primera tarea!</p>
            ) : null}
            <button className="home-add-task" onClick={() => setShowModal(true)}>
                <span className="home-add-task-icon" aria-hidden="true">+</span>
                <span className="home-add-task-title">Nueva tarea</span>
                <span className="home-add-task-hint">Haz clic para agregar</span>
            </button>
        </div>
    )
}