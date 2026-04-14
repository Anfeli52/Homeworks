export interface NaryNodeData {
    id: string;
    title: string;
    link?: string;
    children?: NaryNodeData[] | NaryNode[];
}

export class NaryNode {
    id: string;
    title: string;
    children: NaryNode[];
    link?: string;

    constructor(data: NaryNodeData) {
        this.id = data.id;
        this.title = data.title;
        this.link = data.link;
        this.children = (data.children ?? []).map((child) =>
            child instanceof NaryNode ? child : new NaryNode(child)
        );
    }

    addChild(child: NaryNode | NaryNodeData) {
        this.children.push(child instanceof NaryNode ? child : new NaryNode(child));
    }
}