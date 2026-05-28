export class Graph {
    nodes: string[];
    adjacencyList: { [key: string]: string[] };

    constructor() {
        this.nodes = [];
        this.adjacencyList = {};
    }

    addNode(node: string): void {
        if (this.nodes.includes(node)) {
            return;
        }

        this.nodes.push(node);
        this.adjacencyList[node] = [];
    }

    addEdge(node1: string, node2: string): void {
        if (!this.adjacencyList[node1] || !this.adjacencyList[node2] || node1 === node2) {
            return;
        }

        if (!this.adjacencyList[node1].includes(node2)) {
            this.adjacencyList[node1].push(node2);
        }

        if (!this.adjacencyList[node2].includes(node1)) {
            this.adjacencyList[node2].push(node1);
        }
    }

    searchNode(node: string): string | undefined {
        if(!this.nodes.length) return;
        return this.nodes.find(n => n == node);
    }

    getNeighbors(node: string): string[] {
        if (!this.nodes.includes(node)) {
            return [];
        }

        return Array.from(this.adjacencyList[node]!);
    }

    printAdjacencyList(node: string): void {
        if(this.searchNode(node)) {
            console.log(this.adjacencyList[node]);
        }
    }

    printGraph(): void {
        console.log(this.adjacencyList);
    }
}