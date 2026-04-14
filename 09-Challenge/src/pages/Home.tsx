export const Home = () => {
    return (
        <div className="page">
            <div className="page-header">
                <h1>Bienvenido a El Telón</h1>
                <p>Tu cine de confianza desde hace más de 40 años</p>
            </div>
            
            <div className="content-grid">
                <div className="card">
                    <h3>🎬 Cartelera</h3>
                    <p>Descubre las últimas películas en nuestras salas. Desde los grandes estrenos hasta los clásicos favoritos, tenemos algo para todos.</p>
                    <button className="btn">Ver Películas</button>
                </div>
                
                <div className="card">
                    <h3>⭐ Estrenos</h3>
                    <p>Mantente atento a los próximos estrenos. Consulta nuestras preventas especiales y no te pierdas ningún lanzamiento.</p>
                    <button className="btn">Ver Estrenos</button>
                </div>
                
                <div className="card">
                    <h3>🍿 Dulcería</h3>
                    <p>Disfruta de snacks, bebidas y combos especiales mientras disfrutas del cine. Calidad garantizada.</p>
                    <button className="btn">Ver Dulcería</button>
                </div>
                
                <div className="card">
                    <h3>🎁 Promociones</h3>
                    <p>Accede a ofertas especiales del Socio El Telón y promociones con tu banco favorito.</p>
                    <button className="btn">Ver Beneficios</button>
                </div>
            </div>
        </div>
    );
}