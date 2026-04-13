import Tree from "react-d3-tree";
import { useTreeRender } from "../hooks/useTreeRender";
import "../styles/BinaryTree.css";


export const BinaryTree = () => {
    const { value, setValue, treeForRender, validationMessage, validateCurrentValue, insertCurrentValue, printInOrder, printPreOrder, printPostOrder, } = useTreeRender();

    const handleInsert = () => {
        const error = insertCurrentValue();
        if (error) {
            alert(error);
        }
    };

    const handleValidate = () => {
        const message = validateCurrentValue();
        alert(message);
    };

    return (
        <section className="tree-page">
            <div className="tree-card">
                <header className="tree-header">
                    <p className="tree-kicker">Estructuras de datos y Algoritmos 2 -- Andrés Felipe Medina Díaz</p>
                    <h1 className="tree-title">Binary Tree</h1>
                    <p className="tree-description">Inserta valores y visualiza el árbol binario de forma ordenada y clara.</p>
                </header>

                <div className="tree-controls">
                    <label className="tree-field">
                        <span className="tree-label">Valor</span>
                        <input className="tree-input" type="number" placeholder="Ingresa un valor" value={value} onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)}/>
                    </label>

                    <button className="tree-button tree-button-primary" onClick={handleInsert}> Agregar </button>
                    <button className="tree-button tree-button-secondary" onClick={handleValidate}> Validar </button>
                </div>

                {validationMessage && <p className="tree-status">{validationMessage}</p>}

                <div className="tree-actions">
                    <button className="tree-button tree-button-secondary" onClick={printPreOrder}> PreOrder </button>
                    <button className="tree-button tree-button-secondary" onClick={printInOrder}> InOrder </button>
                    <button className="tree-button tree-button-secondary" onClick={printPostOrder}> PostOrder </button>
                </div>

                <div className="tree-visualization">
                    {treeForRender && (
                        <Tree
                            data={treeForRender}
                            orientation="vertical"
                            pathFunc="step"
                            translate={{ x: 420, y: 60 }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};