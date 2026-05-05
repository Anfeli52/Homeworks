import type { Product } from "../models/Product";

export class TrieNode {
    children: Map<string, TrieNode>;
    product: Product | null;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.product = null;
        this.isEndOfWord = false;
    }
}
