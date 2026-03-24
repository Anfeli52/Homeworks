import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import '../Styles/home.css'
import imglibreria from '../assets/library.png';
import imgAtm from '../assets/atm.png';

function Home() {
    return (
        <>
            <Navbar/>
            <div className="home-section">
                <div className="home-container">
                    <div className="home-group">
                        <h3 className="home-title">Librería</h3>
                        <img src={imglibreria} alt="" />
                        <Link to="/library" className="home-link">Ver Ejercicio</Link>
                    </div>
                    <div className="home-group">
                        <h3 className="home-title">ATM</h3>
                        <img src={imgAtm} alt="" />
                        <Link to="/atm" className="home-link">Ver Ejercicio</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;