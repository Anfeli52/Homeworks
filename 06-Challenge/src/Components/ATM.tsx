import { useState } from "react";
import Queue from "../Utils/Queue";
import Transaction from "../Models/Transaction";
import '../Styles/atm.css'
import Navbar from "./Navbar";

function ATM() {
    
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    
    const [queue, setQueue] = useState<Queue>(new Queue());
    
    const addTransaction = () => {
        if(name.trim().length == 0 || balance <= 0 || isNaN(balance)){
            alert('Por favor no deje espacios vacios ni agregue valores menores a 0');
            return;
        }

        const newTransaction = new Transaction(name, balance);
        const newQueue = new Queue();

        if(queue.isEmpty()){
            newQueue.enqueue(newTransaction);
            setQueue(newQueue);
            return;
        }

        queue.items.forEach(trans => newQueue.enqueue(trans));
        newQueue.enqueue(newTransaction);

        const sortedList = newQueue.items.sort((a, b) => +a.getCreatedDate() - +b.getCreatedDate());
        newQueue.items = sortedList;
        setQueue(newQueue);

    }

    const porcessTrans = () => {
        const newQueue = new Queue ();
        const dequeuedTrans = queue.dequeue();

        if(dequeuedTrans){
            queue.items.forEach(trans => newQueue.enqueue(trans));
            setQueue(newQueue);
        }
    }

    return (
        <>
            <Navbar />
            <div className="atm-section">
                <div className="atm-container">
                    <form onSubmit={(e) => {e.preventDefault(); addTransaction(); }} className="atm-form">
                        <label> Nombre: <input type="text" onChange={(e) => setName(e.target.value)} /></label>
                        <label> Cantidad: <input type="number" step="0.1" onChange={(e) => setBalance(parseFloat(e.target.value))} /></label>
                        <div className="button-actions">
                            <button type="submit"> Agregar Transacción </button>
                        </div>
                    </form>

                    <div className="atm-queue">
                        {queue && !queue.isEmpty() ? (
                            queue.items.map((trans, idx) => (
                                <div key={idx} className="trans-item">
                                    <h4>
                                        {trans.getName()}
                                    </h4>
                                    <p>Nombre: {trans.getName()}</p>
                                    <p>Monto: {trans.getAmount()}</p>
                                    <p>Fecha: {trans.getCreatedDate().toString()}</p>
                                    {idx === 0 && (
                                        <button className="process-btn" onClick={ porcessTrans }>Procesar Transacción</button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No hay transacciones aún</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ATM;