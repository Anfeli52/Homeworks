import React, { useState, useMemo } from 'react';
import { Trie } from '../utils/Trie';
import { findTop3 } from '../utils/Find';
import type { Product } from '../models/Product';

export const ProductSearch = ({ data }: { data: Product[] }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);

    const productTrie = useMemo(() => {
        const trie = new Trie();
        
        data.forEach(p => trie.insert(p));
        return trie;
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);

        if (val.length > 0) {
            const topK = findTop3(productTrie, val, 3);
            setResults(topK);
        } else {
            setResults([]);
        }
    };

    return (
        <div className="search-container">
            <h3 className="search-title">Smart Search</h3>
            <p className="search-description">Busca productos por nombre. Mostramos los 3 más populares.</p>
            
            <div className="search-input-wrapper">
                <input type="text" className="search-input" value={query} onChange={handleSearch} placeholder="Buscar productos..." />
            </div>
            
            {query && (
                <div className="results-container">
                    {results.length > 0 ? (
                        <ul className="results-list">
                            {results.map((product) => (
                                <li key={product.name} className="result-item">
                                    <span className="result-name">{product.name}</span>
                                    <div className="result-popularity">
                                        <span className="popularity-badge">{product.popularity}</span>
                                    </div>
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
    );
};