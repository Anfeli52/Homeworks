import type { NaryNodeDirectory, NaryNodeFile } from "../types/NaryNodeTypes";
import { NaryNode } from "./NaryNode";

export class NaryTree {
    root: NaryNode | null;

    constructor() {
        this.root = null;
    }

    setRoot(value: NaryNodeDirectory | NaryNodeFile) {
        this.root = new NaryNode(value);
    }

    insert(parentId: string, value: NaryNodeDirectory | NaryNodeFile): boolean {
        if (!this.root) {
            return false;
        }

        const parentNode = this.findNode(this.root, parentId);
        if (!parentNode) {
            return false;
        }

        const newNode = new NaryNode(value);
        parentNode.addChild(newNode);
        return true;
    }

    private findNode(node: NaryNode, id: string): NaryNode | null {
        if (node.value.id === id) {
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