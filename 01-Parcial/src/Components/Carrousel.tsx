import { useEffect, useState } from "react";
import type LinkedList from "../Utils/LinkedList";

interface Props {
    carouselList: LinkedList;
}

function Carousel({carouselList} : Props) {

    const [carousel, setCarousel] = useState(carouselList.head);

    useEffect(() => {
        setCarousel(carouselList.head);
    }, [carouselList]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCarousel((prev) => {
                if (prev && prev.next) {
                    return prev.next;
                }
                return carouselList.head;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [carouselList]);


    return (
        <>
            {carousel ? (
                <div className="vehicle-carousel info">
                    <span className="vehicle-model"> {carousel.value.marca} - {carousel.value.model} </span>
                    <span className="vehicle-year"> {carousel.value.year} </span>
                    <span className="vehicle-price"> ${carousel.value.price} </span>
                </div>
            ) : (
                <span>No hay vehículos disponibles</span>
            )}
        </>
    );
}

export default Carousel;