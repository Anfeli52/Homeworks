import type { Song } from "../../models/Song";

export class NodeTrie {
    children: Map<string, NodeTrie>;
    song: Song | null;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map<string, NodeTrie>();
        this.song = null;
        this.isEndOfWord = false;
    }
}