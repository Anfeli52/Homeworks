import { Product } from "../models/Product";
import { MinHeap } from "./MinHeap";
import type { Trie } from "./Trie";

export function findTop3(trie: Trie, prefix: string, maxProducts: number): Product[] {
    const allMatches = trie.findSuggestions(prefix);

    if(allMatches.length <= maxProducts) {
        return allMatches.sort((a, b) => b.popularity - a.popularity);
    }

    const minHeap = new MinHeap(allMatches);

    while(minHeap.size() > maxProducts) {
        minHeap.pop();
    }

    return minHeap.toArray().sort((a, b) => b.popularity - a.popularity);
}