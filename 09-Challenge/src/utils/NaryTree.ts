import { NaryNode } from "./NaryNode";
import type { NaryNodeData } from "./NaryNode";

export class NaryTree {
    root: NaryNode | null;

    constructor() {
        this.root = null;
    }

    insert(data: NaryNodeData, parentId?: string) {
        const newNode = new NaryNode(data);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        if (!parentId) {
            this.root.addChild(newNode);
            return;
        }

        const parentNode = this.findNode(this.root, parentId);
        if (!parentNode) {
            throw new Error("No se encontró el nodo padre: " + parentId);
        }

        parentNode.addChild(newNode);
    }

    private findNode(node: NaryNode, id: string): NaryNode | null {
        if (node.id === id) {
            return node;
        }
        for (const child of node.children) {
            const found = this.findNode(child, id);
            if (found) {
                return found;
            }
        }
        return null;
    }
}