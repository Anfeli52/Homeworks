import { Clock3 } from "lucide-react";
import type { Song } from "../models/Song";

interface SongCardProps {
    catalog: Song[];
    currentSong: Song;
    onSelectSong: (song: Song) => void;
}

export const SongCard = ({ catalog, currentSong, onSelectSong }: SongCardProps) => {
    return (
        <section className="songs-panel">
            <div className="songs-header">
                <span>#</span>
                <span>Titulo</span>
                <span>Album</span>
                <span>Popularidad</span>
                <span aria-label="duracion">
                    <Clock3 size={16} />
                </span>
            </div>

            <div className="songs-body">
                {catalog.map((song, index) => {
                    const isActive = song.name === currentSong.name;

                    return (
                        <button
                            key={song.name}
                            type="button"
                            className={`song-row ${isActive ? "active" : ""}`}
                            onClick={() => onSelectSong(song)}
                        >
                            <span>{index + 1}</span>
                            <span className="song-main">
                                <img src={song.albumArt} alt={`Portada del album ${song.album}`} />
                                <span>
                                    <strong>{song.name}</strong>
                                    <small>{song.artist}</small>
                                </span>
                            </span>
                            <span>{song.album}</span>
                            <span>{song.popularity}</span>
                            <span>
                                {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, "0")}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};