import type { Song } from "../../models/Song";
import { NodeTrie } from "./NodeTrie";

export class Trie {
    root: NodeTrie;

    constructor() {
        this.root = new NodeTrie();
    }

    insert(song: Song): void {
        let currentNode = this.root;
        for (const char of song.name.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new NodeTrie());
            }
            currentNode = currentNode.children.get(char)!;
        }
        currentNode.song = song;
        currentNode.isEndOfWord = true;
    }

    findSuggestions(prefix: string, limit = 3): Song[] {
        let currentNode = this.root;
        for (const char of prefix.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                return [];
            }
            currentNode = currentNode.children.get(char)!;
        }

        const results: Song[] = [];

        const stack: NodeTrie[] = [currentNode];
        while (stack.length > 0) {
            const node = stack.pop()!;
            if (node.isEndOfWord && node.song) {
                results.push(node.song);
            }
            const children = Array.from(node.children.values());
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push(children[i]);
            }
        }

        return results
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, limit);
    }

    search(word: string): boolean {
        let currentNode = this.root;
        for (const char of word.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                return false;
            }
            currentNode = currentNode.children.get(char)!;
        }
        return currentNode.isEndOfWord;
    }
}