class Nodo {

    value: any;
    left: Nodo | null;
    right: Nodo | null;

    constructor(value: any){
        this.value = value;
        this.left = null;
        this.right = null;
    }

    isLeaf() {
        if(this.left === null && this.right === null) {
            return true;
        }
        return false;
    }
}

export default Nodo;