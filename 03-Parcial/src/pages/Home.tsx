import { useMemo, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Shuffle, Repeat2 } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import { SongCard } from "../components/SongCard";
import { songs } from "../data/songs";
import { Graph } from "../utils/graph/Graph";
import { MaxHeap } from "../utils/heap/Heap";
import type { Song } from "../models/Song";
import { ModalNewSong } from "../components/ModalNewSong";

export const Home = () => {
    const [catalog, setCatalog] = useState<Song[]>(songs);
    const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const topSongs = useMemo(() => {
        const heap = new MaxHeap(catalog);
        const top: Song[] = [];

        while (!heap.isEmpty() && top.length < 5) {
            const song = heap.pop();

            if (song) {
                top.push(song);
            }
        }

        return top;
    }, [catalog]);

    const recommendationMap = useMemo(() => {
        const graph = new Graph();

        catalog.forEach((song) => graph.addNode(song.name));

        for (let i = 0; i < catalog.length; i++) {
            for (let j = i + 1; j < catalog.length; j++) {
                const first = catalog[i];
                const second = catalog[j];

                if (first.artist === second.artist || first.genre === second.genre) {
                    graph.addEdge(first.name, second.name);
                }
            }
        }

        const baseSong = catalog.find((song) => song.name === currentSong.name) ?? catalog[0];
        const baseTrack = baseSong.name;
        const relatedToCurrentSong = graph.getNeighbors(baseTrack);

        return relatedToCurrentSong
            .map((name) => catalog.find((song) => song.name === name))
            .filter((song): song is Song => Boolean(song))
            .sort((a, b) => {
                const aArtistBoost = a.artist === baseSong.artist ? 100 : 0;
                const bArtistBoost = b.artist === baseSong.artist ? 100 : 0;
                const aGenreBoost = a.genre === baseSong.genre ? 10 : 0;
                const bGenreBoost = b.genre === baseSong.genre ? 10 : 0;

                return (bArtistBoost + bGenreBoost + b.popularity) - (aArtistBoost + aGenreBoost + a.popularity);
            })
            .slice(0, 6);
    }, [catalog, currentSong.name]);

    const currentSongIndex = catalog.findIndex((song) => song.name === currentSong.name);

    const goToSongAt = (index: number) => {
        if (catalog.length === 0) {
            return;
        }

        const safeIndex = (index + catalog.length) % catalog.length;
        setCurrentSong(catalog[safeIndex]);
    };

    const handleNext = () => {
        goToSongAt(currentSongIndex + 1);
    };

    const handlePrevious = () => {
        goToSongAt(currentSongIndex - 1);
    };

    const addSong = (song: Song) => {
        setCatalog((current) => [...current, song]);
        setShowModal(false);
    }

    return (
        <main className="app-shell">
            {showModal && <ModalNewSong onClose={() => setShowModal(false)} onSave={addSong} />}
            <aside className="sidebar-panel">
                <div className="brand-block">
                    <div className="brand-dot" />
                    <div>
                        <p className="brand-subtitle">SPOTIÑY</p>
                        <h1>Liked Songs</h1>
                    </div>
                </div>

                <div className="sidebar-group">
                    <div className="sidebar-title-row">
                        <h2>Top canciones</h2>
                    </div>

                    <ul className="sidebar-list">
                        {topSongs.map((song, index) => (
                            <li key={song.name}>
                                <button type="button" className="sidebar-item" onClick={() => setCurrentSong(song)}>
                                    <span className="rank-pill">{index + 1}</span>
                                    <div>
                                        <strong>{song.name}</strong>
                                        <span>{song.artist}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sidebar-group">
                    <div className="sidebar-title-row">
                        <h2>Sugeridas</h2>
                    </div>

                    <ul className="sidebar-list">
                        {recommendationMap.map((song) => (
                            <li key={song.name}>
                                <button type="button" className="sidebar-item" onClick={() => setCurrentSong(song)}>
                                    <span className="cover-dot" />
                                    <div>
                                        <strong>{song.name}</strong>
                                        <span>{song.artist}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <section className="content-panel">
                <header className="top-search-bar">
                    <SearchBar catalog={catalog} onSelectSong={setCurrentSong} />
                </header>
                
                <div className="button-actions">
                    <button type="button" className="btn" onClick={() => setShowModal(true)}>
                        Agregar Canción
                    </button>
                </div>

                <SongCard catalog={catalog} currentSong={currentSong} onSelectSong={setCurrentSong} />
            </section>

            <footer className="player-bar">
                <div className="player-left">
                    <img src={currentSong.albumArt} alt={`Portada del album ${currentSong.album}`} />
                    <div>
                        <strong>{currentSong.name}</strong>
                        <span>{currentSong.artist}</span>
                    </div>
                </div>

                <div className="player-center">
                    <div className="player-controls">
                        <button type="button" className="icon-btn" aria-label="mezclar">
                            <Shuffle size={16} />
                        </button>
                        <button type="button" className="icon-btn" aria-label="anterior" onClick={handlePrevious}>
                            <SkipBack size={18} />
                        </button>
                        <button type="button" className="play-btn" aria-label={isPlaying ? "pausar" : "reproducir"} onClick={() => setIsPlaying((state) => !state)}>
                            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                        </button>
                        <button type="button" className="icon-btn" aria-label="siguiente" onClick={handleNext}>
                            <SkipForward size={18} />
                        </button>
                        <button type="button" className="icon-btn" aria-label="repetir">
                            <Repeat2 size={16} />
                        </button>
                    </div>

                    <div className="player-progress">
                        <span>0:00</span>
                        <div className="progress-track">
                            <div className="progress-fill" style={{ width: isPlaying ? "44%" : "22%" }} />
                        </div>
                        <span>{Math.floor(currentSong.duration / 60)}:{String(currentSong.duration % 60).padStart(2, "0")}</span>
                    </div>
                </div>
            </footer>
        </main>
    )
};