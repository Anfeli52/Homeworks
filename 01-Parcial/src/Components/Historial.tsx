import { useState, useEffect } from "react";
import type LinkedList from "../Utils/LinkedList";

interface Props {
    historialList: LinkedList;
}

function Historial({ historialList }: Props){
    
    const [currentNode, setCurrentNode] = useState(historialList.head);

    useEffect(() => {
        setCurrentNode(historialList.head);
    }, [historialList]);
    
    
    const nextHistorialVehicule = () => {
        if(currentNode && currentNode.next){
            setCurrentNode(currentNode.next);
        }
    }

    const prevHistorialVehicle = () => {
        setCurrentNode((prevVehi) => {
            if (!prevVehi || prevVehi === historialList.head) {
                return prevVehi;
            }

            let current = historialList.head;
            while (current?.next && current.next !== prevVehi) {
                current = current.next;
            }

            return current;
        });
    }

    console.log(historialList);
    
    return (
        <>
            { historialList.head ? (
                <div className="vehicle-historial info">
                    <span className="hitorical-vehicle-model"> {currentNode?.value.model} - {currentNode?.value.year} </span>
                    <span className="hitorical-vehicle-marca"> {currentNode?.value.marca} </span>
                    <span className="hitorical-vehicle-prive"> ${currentNode?.value.price} </span>
                    <div className="vehicule-historial action-buttons">
                        <button className="prev-historial-vehicle" onClick={ prevHistorialVehicle } > Anterior Vehículo </button>
                        <button className="next historial-vehicle" onClick={ nextHistorialVehicule }> Siguiente Vehículo </button>
                    </div>
                </div>
            ) : (
                <div className="vehicle-historial info">
                    <span className="empty-message">No existen vehículos alquilados aún</span>
                </div>
            )}
            
        </>
    );
}

export default Historial;