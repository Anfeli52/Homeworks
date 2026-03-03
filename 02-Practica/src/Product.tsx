import { useState } from "react";
import type LinkedList from "./LinkedList";
import type Node from "./Node";

interface Props {
    productList: LinkedList;
}

function Product({productList} : Props) {
    const [currentNode, setCurrentNode] = useState<Node | null>(productList.head);

    const nextProduct = () => {
        setCurrentNode((prevProd) => {
            if(!prevProd) return productList.head;
            return prevProd.next ?? productList.head;
        });
    };

    const prevProduct = () => {
        setCurrentNode((prevProd) => {
            if(!prevProd || prevProd === productList.head){
                let tail = productList.head;
                while(tail?.next){
                    tail = tail.next;
                }
                return tail;
            } 
            
            let current = productList.head;
            while (current?.next && current.next !== prevProd) {
                current = current.next
            }
            
            return current;
        });
    }

    if(!currentNode) return null;

    return (
        <div className="product-container">
            <div className="product-card">
                <div className="product-image-container">
                    <img src={currentNode.value.productImg} alt="" />
                </div>
                <div className="product-info">
                    <h3>{currentNode.value.productName}</h3>
                    <span>Precio: <b>${currentNode.value.productPrice}</b></span>

                    <div className="controls">
                        <button className="btn prevProduct" onClick={prevProduct}> Anterior Producto </button>
                        <button className="btn nextProduct" onClick={nextProduct}> Siguiete Producto </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;