import { useState } from "react";
import ModalNewContact from "./ModalNewContact";

function ContactList() {
    const [showModal, setShowModal] = useState(false);
    const [contactos, setContacts] = useState([
        {nombre: 'Andrés',  Telefono: '1234567890'},
        {nombre: 'Gian',    Telefono: '2345678901'},
        {nombre: 'Jerson',  Telefono: '3456789012'},
        {nombre: 'Jose',    Telefono: '4567890123'}
    ]);
    console.log("Entró a la función")

    const addContact = (newContact: {nombre: string, Telefono: string}) => {
        setContacts([...contactos, newContact]);
        setShowModal(false);
    }

    const deleteContact = (nombre:string) => {
        setContacts(contactos.filter(usuario => usuario.nombre != nombre));
    }

    return (
        <div className="app-container">
            {showModal && <ModalNewContact onClose={() => setShowModal(false)} onSave={addContact} />}

            <h1 style={{color: '#fff', marginBottom: '30px'}}>Mis Contactos</h1>

            <ol className="contact-list">
                {contactos.map((item, index) => (
                    <li key={index} className="contact-item">
                        <span>
                            <b>{item.nombre}</b>
                        </span>
                        <span style={{color: 'var(--text-dim)'}}>
                            {item.Telefono}
                        </span>
                        <button className="btn-delete-main" onClick={() => deleteContact(item.nombre)}>
                            Eliminar 
                        </button>
                    </li>
                ))}
            </ol>

            <button className="btn-add-main" onClick={() => setShowModal(true)}>
                + Añadir Nuevo Contacto
            </button>
        </div>
    );
}

export default ContactList;