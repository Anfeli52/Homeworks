import { useState, useEffect } from "react";
import ContactList from './ContactList.tsx'

function Loader() {
    const [segundos, setSegundos] = useState(0);

    useEffect(() => {
        if (segundos >= 100) return;

        const timer = setInterval(() => {
            setSegundos(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 25);

        return () => clearInterval(timer);
    }, [segundos]);


    if(segundos >= 100){
        return(
            <ContactList/>
        );
    }
    
    console.log(segundos)
    return (
        <h2>Loading {segundos}%</h2>
    );

}

export default Loader;