import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where, type WhereFilterOp } from "firebase/firestore";
import { createContext, useContext, useState, type ReactNode } from "react";
import { db } from "../firebase/credentials";

interface Task {
    id: string;
    title: string;
    body: string;
    status: boolean;
}

interface Filter {
    field: string;
    op: WhereFilterOp;
    value: any;
}

type CreateTaskInput = Omit<Task, "id">; //ES UN CONSTRUCTOR CON TODAS LAS PROPIEDADES DE TASK, MENOS EL ID
type UpdateTaskInput = Partial<Omit<Task, "id">>; //CREA TODAS LOS ATRIBUTOS DE TASK OPCIONALES, ADEMÁS CREA EL CONSTRUCTOR EXCLUYENDO EL ID

interface TaskContextType {
    result: Task[];
    isPending: boolean;
    error: string | null;
    createTask: (data: CreateTaskInput) => Promise<void>;
    deleteTask: (id: string) => Promise<boolean>;
    updateTask: (id: string, data: UpdateTaskInput) => Promise<boolean>;
    getTasks: () => Promise<Task[]>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [result, setResult] = useState<Task[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTask = async (data: CreateTaskInput): Promise<void> => {
        setIsPending(true);
        setError(null);

        try {
            await addDoc(collection(db, "tasks"), {
                ...data,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            setError("Error al crear la tarea");
        } finally {
            setIsPending(false);
        }
    };

    const deleteTask = async (id: string): Promise<boolean> => {
        setIsPending(true);
        setError(null);

        try {
            await deleteDoc(doc(db, "tasks", id));
            setResult(prev => prev.filter(task => task.id !== id));
            return true;
        } catch (error) {
            setError("Error al eliminar la tarea");
            return false;
        } finally {
            setIsPending(false);
        }
        
    };

    const updateTask = async (id: string, data: UpdateTaskInput): Promise<boolean> => {
        setIsPending(true);
        setError(null);

        try {
            await updateDoc(doc(db, "tasks", id), {
                ...data,
                updatedAt: serverTimestamp(),
            });
            setResult(prev => prev.map(task => task.id === id ? { ...task, ...data } : task));
            return true;
        } catch (error: any) {
            setError(error.message || "Error al actualizar la tarea");
            return false;
        } finally {
            setIsPending(false);
        }
    };

    const getTasks = async (filters: Filter[] = []): Promise<Task[]> => {
        setIsPending(true);
        setError(null);
        
        try {
            let queryFirebase = query(collection(db, "tasks"));

            for(const {field, op, value} of filters) {
                queryFirebase = query(queryFirebase, where(field, op, value));
            }

            const snapshot = await getDocs(queryFirebase);
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[];
            setResult(docs);
            return docs;
        } catch (error) {
            setError("Error al obtener las tareas");
            return [];
        } finally {
            setIsPending(false);
        }
    };

    return (
        <TaskContext.Provider value={{ result, isPending, error, createTask, deleteTask, updateTask, getTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTask debe usarse dentro de TaskProvider");
    return context;
};