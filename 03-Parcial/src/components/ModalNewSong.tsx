import { useState } from "react";
import { Song } from "../models/Song";
import "../styles/modal.scss";

interface Props {
    onClose: () => void;
    onSave: (song: any) => void;
}

export const ModalNewSong = ({ onClose, onSave }: Props) => {
    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");
    const [genre, setGenre] = useState("");
    const [album, setAlbum] = useState("");
    const [albumArt, setAlbumArt] = useState("");
    const [duration, setDuration] = useState(0);
    const [popularity, setPopularity] = useState(0);

    const handleAddSong = () => {
        if(name.trim() === "" || artist.trim() === "" || genre.trim() === "" || album.trim() === "" || albumArt.trim() === "" || duration <= 0 || popularity < 0) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        onSave(new Song(name, artist, genre, album, albumArt, duration, popularity));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="title">
                    Nueva Canción
                </div>
                <div className="studentInfo">
                    <label>
                        Nombre de la Canción
                        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Ej. Papercut"/>
                    </label>
                    <label>
                        Artista
                        <input type="text" onChange={(e) => setArtist(e.target.value)} placeholder="Ej. Linkin Park"/>
                    </label>
                    <label>
                        Género
                        <input type="text" onChange={(e) => setGenre(e.target.value)} placeholder="Ej. Nu Metal"/>
                    </label>
                    <label>
                        Album
                        <input type="text" onChange={(e) => setAlbum(e.target.value)} placeholder="Ej. Hybrid Theory"/>
                    </label>
                    <label>
                        Portada del Album (URL)
                        <input type="text" onChange={(e) => setAlbumArt(e.target.value)} placeholder="Ej. https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg"/>
                    </label>
                    <label>
                        Duración (segundos)
                        <input type="number" onChange={(e) => setDuration(parseInt(e.target.value))} placeholder="Ej: 185"/>
                    </label>
                    <label>
                        Popularidad (0-100)
                        <input type="number" onChange={(e) => setPopularity(parseInt(e.target.value))} placeholder="Ej: 85"/>
                    </label>
                </div>

                <div className="model-actions">
                    <button onClick={handleAddSong} className="btn-save">
                        Guardar
                    </button>
                    <button onClick={onClose} className="btn-cancel">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}