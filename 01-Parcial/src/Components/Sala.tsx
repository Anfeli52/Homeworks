import { useEffect, useState } from "react";
import LinkedList from "../Utils/LinkedList";
import Node from "../Utils/Node";
import Vehicle from "../Models/Vehicle";
import Historial from "./Historial";
import Carousel from "./Carrousel";
import Investor from "./Investor";

function Sala (){

    const [vehicules, setVehiculos] = useState([
        new Vehicle ('BMW', '5 Series',     'Automatic',        '2016', '17.000.000'),
        new Vehicle ('BMW', 'X3',           'Manual',           '2017', '24.000.000'),
        new Vehicle ('BMW', '1 Series',     'Automatic',        '2017', '21.000.000'),
        new Vehicle ('BMW', 'X5',           'Automatic',        '2015', '14.500.000'),
        new Vehicle ('BMW', '7 Series',     'Automatic',        '2014', '15.000.000')
    ]);

    const [linkedList, setLinkedList] = useState<LinkedList>(new LinkedList());
    const [currentNode, setCurrentNode] = useState<Node | null>(linkedList.head);

    const [historial, setHistorial] = useState<LinkedList>(new LinkedList());

    useEffect(() => {
        const list = new LinkedList();
        vehicules.forEach((vehi) => {list.add(vehi)});
        setLinkedList(list);
        setCurrentNode(list.head);
    }, [vehicules])

    const nextVehicle = () => {
        if(currentNode && currentNode.next){
            setCurrentNode(currentNode.next);
        }
    };

    const rentVehicle = (model: string) => {
        const vehicleToRent = vehicules.find(vehi => vehi.model === model);
        if (vehicleToRent) {
            setHistorial((prevHistorial) => {
                const updatedHistorial = new LinkedList();
                let current = prevHistorial.head;
                while (current) {
                    updatedHistorial.add(current.value);
                    current = current.next;
                }
                updatedHistorial.add(vehicleToRent);
                return updatedHistorial;
            });
        }
        setVehiculos((prevVehicles) => {
            const updated = prevVehicles.filter(vehi => vehi.model != model);
            if(currentNode?.value.model === model) {
                if(currentNode.next) {
                    setCurrentNode(currentNode.next);
                } else if(currentNode.prev) {
                    setCurrentNode(currentNode.prev);
                } else {
                    setCurrentNode(null);
                }
            }
            return updated;
        });
    }

    return (
        <>
            <div className="vehicle-container">
                <div className="vehicle info">
                    { currentNode ? (
                        <>
                            <span className="vehicle-model"> {currentNode.value.model} - {currentNode.value.year} </span>
                            <span className="vehicle-marca"> {currentNode.value.marca} </span>
                            <span className="vehicle-price"> ${currentNode.value.price} </span>
                            <div className="vehicule action-buttons">
                                <button className="next vehicule" onClick={ nextVehicle }> Siguiente Vehículo </button>
                                <button className="rent-vehicule" onClick={() => rentVehicle(currentNode.value.model) }> Alquilar Vehículo </button>
                            </div>
                        </>
                    ) : (
                        <p> No hay más vehículos disponibles </p>
                    )}
                </div>
                <div className="vehicule-historial">
                    <Historial historialList={historial}/>
                </div>
                <div className="vehicule-auto-rotate">
                    <Carousel carouselList={ linkedList }/>
                </div>
                <div className="vehicle-active-investors">
                    <Investor/>
                </div>
            </div>
        </>
    );
}

export default Sala;