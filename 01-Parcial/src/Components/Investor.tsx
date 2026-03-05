import { useEffect, useState } from "react";
import Node from "../Utils/Node";
import LinkedList from "../Utils/LinkedList";

function Investor() {

    const [investors, setInvestors] = useState([
        {investorName: 'Andrés Medina'},
        {investorName: 'Isabella Giraldo'},
        {investorName: 'Chris Cornell'},
        {investorName: 'Chester Bennington'},
        {investorName: 'Mike Shinoda'},
        {investorName: 'Emily Armstrong'}
    ]);

    const [linkedList, setLinkedList] = useState<LinkedList>(new LinkedList());
    const [currentNode, setCurrentNode] = useState<Node | null>(linkedList.head);

    useEffect(() => {
        const list = new LinkedList();
        investors.forEach(inv => list.add(inv));
        setLinkedList(list);
        setCurrentNode(list.head);
    }, [investors]);

    const nextInvestor = () => {
        setCurrentNode((prevInvestor) => {
            if(!prevInvestor) return linkedList.head;
            return prevInvestor.next ?? linkedList.head;
        });
    };

    const prevInvestor = () => {
        setCurrentNode((prevInvestor) => {
            if(!prevInvestor || prevInvestor === linkedList.head){
                let tail = linkedList.head;
                while(tail?.next){
                    tail = tail.next;
                }
                return tail;
            };
            
            let current = linkedList.head;
            while(current?.next && current.next != prevInvestor) {
                current = current.next;
            }

            return current;
        });
    }

    if(!currentNode) return null;

    return (
        <div className="vehicle-investor info">
            <span className="vehicle-investor-name"> {currentNode?.value.investorName} </span>
            <div className="vehicle-investor action-buttons">
                <button className="prev-investor" onClick={ prevInvestor }> Anterior Inversionista </button>
                <button className="next investor" onClick={ nextInvestor }> Siguiente Inversionista </button>
            </div>
        </div>
    );
}

export default Investor;