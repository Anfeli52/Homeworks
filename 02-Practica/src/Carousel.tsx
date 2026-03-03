import productPic1 from './assets/MonterEnergy.webp'
import productPic2 from './assets/Hybrid_Theory.webp'
import productPic3 from './assets/TVS_Raider.webp'
import productPic4 from './assets/NintendoSwitch.webp'
import productPic5 from './assets/PS5_Digital.webp'

import { useEffect, useState } from 'react';
import LinkedList from './LinkedList';
import Product from './Product';

function Carousel(){
    const [products, setProduct] = useState([
        {productName: 'Monster Energy', productImg: productPic1, productPrice: 8500},
        {productName: 'Linkin Park - Hybrid Theory Album', productImg: productPic2, productPrice: 153000},
        {productName: 'TVS Raider 125', productImg: productPic3, productPrice: 7700000},
        {productName: 'Nintendo Switch', productImg: productPic4, productPrice: 1860000},
        {productName: 'PS5 - Digital Edition', productImg: productPic5, productPrice: 2700000}
    ]);

    const [linkedList, setLinkedList] = useState<LinkedList>(new LinkedList());
    
    useEffect(() => {
        const list = new LinkedList();
        products.forEach((prod) => {list.add(prod)});
        setLinkedList(list);
    }, [products]);

    //**************************************************FUTURA ACTUALIZACIÓN**************************************************/

    // const addProduct = (newProduct: {productName: string, productImg: string, productPrice: number}) => {
    //     setProduct([...products, newProduct]);
    // } 

    return (
        <>
            {linkedList.head ? (
                <Product productList={linkedList} />
            ) : (
                <p>Cargando productos...</p>
            )}
        </>
    );
}

export default Carousel;