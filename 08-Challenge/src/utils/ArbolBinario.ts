import Nodo from "./Nodo";

class ArbolBinario {
    raiz: Nodo | null;

    constructor() {
        this.raiz = null;
    }

    insert(value: any) {
        const newNode = new Nodo(value);
        if(!this.raiz) {
            this.raiz = newNode;
            return;
        }

        let actual = this.raiz;
        while(actual) {
            if(value < actual.value) {
                if(!actual.left) {
                    actual.left = newNode;
                    return;
                }
                actual = actual.left;
            } else {
                if(!actual.right) {
                    actual.right = newNode;
                    return;
                }
                actual = actual.right;
            }
        }
    }

    contains(value: any) {
        let actual = this.raiz;

        while (actual) {
            if (value === actual.value) {
                return true;
            }

            if (value < actual.value) {
                actual = actual.left;
            } else {
                actual = actual.right;
            }
        }

        return false;
    }

    preorder(node : Nodo | null) {
        if(!node) return;
        console.log(node.value);
        this.preorder(node.left);
        this.preorder(node.right);
    }

    inorder(node : Nodo | null) {
        if(!node) return;
        this.inorder(node.left);
        console.log(node.value);
        this.inorder(node.right);
    }
    
    postorder(node : Nodo | null) {
        if(!node) return;
        this.postorder(node.left);
        this.postorder(node.right);
        console.log(node.value);
    }

}

export default ArbolBinario;