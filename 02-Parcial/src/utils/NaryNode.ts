import type { NaryNodeDirectory, NaryNodeFile } from "../types/NaryNodeTypes";

export class NaryNode {
    value: NaryNodeDirectory | NaryNodeFile;
    children: NaryNode[];

    constructor(value: NaryNodeDirectory | NaryNodeFile) {
        this.value = value;
        this.children = [];
    }

    addChild(child: NaryNode) {
        if ('children' in this.value) {
            this.children.push(child);
        } else {
            throw new Error("No se pueden agregar hijos a un nodo de archivo");
        }
    }
}