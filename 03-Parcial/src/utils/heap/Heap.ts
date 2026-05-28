import type { Song } from "../../models/Song";

export class MaxHeap {
    heap: Song[];

    constructor(initialValues: Song[] = []) {
        this.heap = [];

        if(initialValues.length > 0) {
            this.heap = [...initialValues];
            this.heapify();
        }
    }

    push(value: Song): void {
        this.heap.push(value);
        this.percolateUp();
    }

    pop(): Song | undefined {
        if(this.heap.length === 0) return undefined;

        const n = this.heap.length;
        this.swap(0, n - 1);
        const max = this.heap.pop();
        this.percolateDown(0);
        
        return max;
    }

    heapify(): void {
        const start = Math.floor(this.heap.length / 2) - 1;

        for(let i = start; i >= 0; i--) {
            this.percolateDown(i);
        }
    }

    percolateUp(): void {
        let current = this.heap.length - 1;

        while(current > 0) {
            const parent = Math.floor((current - 1) / 2);

            if(this.heap[current].popularity > this.heap[parent].popularity) {
                this.swap(current, parent);
                current = parent;
            } else {
                break;
            }
        }
    }

    percolateDown(index: number): void {
        let current = index;

        while(2 * current + 1 < this.heap.length) {
            const left = 2 * current + 1;
            const right = 2 * current + 2;

            let maxChild = left;

            if (right < this.heap.length && this.heap[right].popularity > this.heap[left].popularity) {
                maxChild = right;
            }

            if(this.heap[maxChild].popularity > this.heap[current].popularity) {
                this.swap(current, maxChild);
                current = maxChild;
            } else {
                break;
            }
        }
    }

    swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    size(): number {
        return this.heap.length;
    }

    toArray(): Song[] {
        return [...this.heap];
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }
}