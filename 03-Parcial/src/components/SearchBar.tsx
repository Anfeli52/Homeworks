import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Trie } from "../utils/trie/Trie";
import type { Song } from "../models/Song";

interface SearchBarProps {
    catalog: Song[];
    onSelectSong: (song: Song) => void;
}

export const SearchBar = ({ catalog, onSelectSong }: SearchBarProps) => {
    const [query, setQuery] = useState("");

    const songTrie = useMemo(() => {
        const trie = new Trie();

        catalog.forEach((song) => trie.insert(song));
        return trie;
    }, [catalog]);

    const results = useMemo(() => {
        if (query.length === 0) {
            return [];
        }

        return songTrie.findSuggestions(query, 3);
    }, [query, songTrie]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
    };

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <Search size={16} />
                <input type="text" className="search-input" value={query} onChange={handleSearch} placeholder="What do you want to play?" />
            </div>

            {query && (
                <div className="results-container">
                    {results.length > 0 ? (
                        <ul className="results-list">
                            {results.map((song) => (
                                <li key={song.name} className="result-item">
                                    <button type="button" className="result-action" onClick={() => { onSelectSong(song); setQuery(""); }}>
                                    <img className="song-cover song-cover-sm" src={song.albumArt} alt={`Portada del album ${song.album}`} />
                                    <div>
                                        <span className="result-name">{song.name}</span>
                                        <div className="result-meta">{song.artist}</div>
                                    </div>
                                    <div className="result-popularity">
                                        <span className="popularity-badge">{song.popularity}</span>
                                    </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="no-results">
                            No se encontraron resultados para "{query}"
                        </div>
                    )}
                </div>
            )}
        </div>
    )
};