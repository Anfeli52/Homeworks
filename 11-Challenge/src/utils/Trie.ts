import type { Product } from "../models/Product";
import { TrieNode } from "./TrieNode";

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(product: Product): void {
        let currentNode = this.root;
        for (const char of product.name.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }
            currentNode = currentNode.children.get(char)!;
        }
        currentNode.product = product;
        currentNode.isEndOfWord = true;
    }

    findSuggestions(prefix: string, limit = 3): Product[] {
        let currentNode = this.root;
        for (const char of prefix.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                return [];
            }
            currentNode = currentNode.children.get(char)!;
        }

        const results: Product[] = [];

        const stack: TrieNode[] = [currentNode];
        while (stack.length > 0 && results.length < limit) {
            const node = stack.pop()!;
            if (node.isEndOfWord && node.product) {
                results.push(node.product);
            }
            const children = Array.from(node.children.values());
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push(children[i]);
            }
        }

        return results;
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