import { useEffect, useState } from "react";
import ModalNewStudent from "./ModalNewStudent";
import Estudiante from "./Estudiante";
import LinkedList from "./LinkedList";
import ModalCurrentStudents from "./ModalCurrentStudents";

function Clases(){
    const [showModal, setShowModal] = useState(false);
    const [showModalStudents, setShowModalStudents] = useState(false);
    const clases = [
        {className: 'Física'},
        {className: 'Cálculo 2'},
        {className: 'Redes de Datos'}
    ];

    const [students, setStudents] = useState([
        new Estudiante("Andrés", 20, "2235618", "Redes de Datos"),
        new Estudiante("Alex", 21, "2235771", "Física"),
        new Estudiante("Lucas", 20, "2237099", "Cálculo 2"),
        new Estudiante("Laura", 19, "2236061", "Redes de Datos")
    ]);

    const [linkedList, setLinkedList] = useState<LinkedList>(new LinkedList());

    const addStudent = (newStudent: Estudiante) => {
        setStudents([...students, newStudent]);
        setShowModal(false);
    };
    useEffect(() => {
        const list = new LinkedList();
        students.forEach((student) => list.add(student));
        setLinkedList(list);
        list.print();
    }, [students]);

    const getStudentsByClass = (className: string) => {
        const result: Estudiante[] = [];
        let current = linkedList.head;
        while (current) {
            if (current.value && current.value.getclassName() === className) {
                result.push(current.value);
                console.log("Estoy devolviendo un Objeto?????: "+current.value)
            }
            current = current.next;
        }
        return result;
    }

    return (
        <div className="classesContainer">  
            {showModal && <ModalNewStudent onClose={() => setShowModal(false)} onSave={addStudent} classes={clases} />}
            {showModalStudents && <ModalCurrentStudents list={linkedList} onClose={() => setShowModalStudents(false)}/>}

            <h1> Clases </h1>
            <ol className="ol-class">

                {clases.map((item, index) => (
                    <div key={index} className="class-item">
                        <span className="box-title">
                            <b>{item.className}</b>
                        </span>
                        <span className="box-numberStudents" style={{background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem'}}> 
                            {getStudentsByClass(item.className).length} Estudiantes
                        </span>
                    </div>
                ))}
            </ol>
            <div className="controls">
                <button className="btn-showStudents" onClick={() => setShowModalStudents(true)}>
                    Ver Estudiantes
                </button>
                <button className="btn-showStudents" onClick={() => setShowModal(true)}>
                    Añadir Estudiante
                </button>
            </div>
        </div>
    )
}

export default Clases;