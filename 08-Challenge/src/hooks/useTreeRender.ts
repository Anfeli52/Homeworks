import { useCallback, useMemo, useState } from "react";
import ArbolBinario from "../utils/ArbolBinario";
import Nodo from "../utils/Nodo";
import { treeData } from "../data/treeData";

interface SerializedTreeNode {
	value: number;
	left: SerializedTreeNode | null;
	right: SerializedTreeNode | null;
};

interface D3TreeNode {
	name: string;
	children?: D3TreeNode[];
};

export const useTreeRender = () => {
	const [value, setValue] = useState(0);
	const [treeVersion, setTreeVersion] = useState(0);
	const [validationMessage, setValidationMessage] = useState("");

	const nodeToD3Tree = useCallback((node: Nodo | null): D3TreeNode | null => {
		if (!node) return null;

		const left = nodeToD3Tree(node.left);
		const right = nodeToD3Tree(node.right);
		const children = [left, right].filter((child): child is D3TreeNode => Boolean(child));

		return {
			name: String(node.value),
			...(children.length > 0 ? { children } : {}),
		};
	}, []);

	const arbol = useMemo(() => {
		const newArbol = new ArbolBinario();

		const insertNode = (nodeData: SerializedTreeNode | null) => {
			if (!nodeData) return;
			newArbol.insert(nodeData.value);
			insertNode(nodeData.left);
			insertNode(nodeData.right);
		};

		insertNode(treeData as SerializedTreeNode);
		return newArbol;
	}, []);

	const treeForRender = useMemo(() => {
		return nodeToD3Tree(arbol.raiz);
	}, [arbol, treeVersion, nodeToD3Tree]);

	const insertCurrentValue = () => {
		if (value < 0) {
			const message = "Por favor, ingresa un valor mayor o igual a 0.";
			setValidationMessage(message);
			return message;
		}

		if (arbol.contains(value)) {
			const message = 'El valor '+value+' ya se encuentra en el árbol.';
			setValidationMessage(message);
			return message;
		}

		arbol.insert(value);
		setValue(0);
		setValidationMessage('El valor '+value+' no se encontraba en el árbol y fue agregado.');
		setTreeVersion((current) => current + 1);
		return null;
	};

	const validateCurrentValue = () => {
		if (value < 0) {
			const message = "Por favor, ingresa un valor mayor o igual a 0.";
			setValidationMessage(message);
			return message;
		}

		const exists = arbol.contains(value);
		const message = exists
			? 'El valor '+value+' se encuentra en el árbol.'
			: 'El valor '+value+' no se encuentra en el árol.';
		setValidationMessage(message);
		return message;
	};

	const printInOrder = () => {
		console.log("--- Recorrido InOrder ---");
		arbol.inorder(arbol.raiz);
	};

	const printPreOrder = () => {
		console.log("--- Recorrido PreOrder ---");
		arbol.preorder(arbol.raiz);
	};

	const printPostOrder = () => {
		console.log("--- Recorrido PostOrder ---");
		arbol.postorder(arbol.raiz);
	};

	return {
		value,
		setValue,
		treeForRender,
		validationMessage,
		validateCurrentValue,
		insertCurrentValue,
		printInOrder,
		printPreOrder,
		printPostOrder,
	};
};
