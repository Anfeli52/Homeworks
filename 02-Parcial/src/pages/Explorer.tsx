import { useState, useEffect } from "react";
import { useExplorer } from "../context/ExplorerContext";
import type { NaryNodeDirectory } from "../types/NaryNodeTypes";
import { TreeNode } from "../components/TreeNode";

type ItemType = "carpeta" | "archivo";

export const Explorer = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState<ItemType>("carpeta");
    const [currentDirectoryId, setCurrentDirectoryId] = useState("root");
    const { addDirectory, addFile, tree, findNodeById } = useExplorer();

    useEffect(() => {
        if (tree && currentDirectoryId !== "root") {
            const node = findNodeById(currentDirectoryId);
            if (!node) {
                setCurrentDirectoryId("root");
            }
        }
    }, [tree, currentDirectoryId]);

    const handlerSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            if (type === "carpeta") {
                await addDirectory(currentDirectoryId, name);
            } else {
                await addFile(currentDirectoryId, name);
            }
        } catch (error) {
            console.error("Error al agregar item:", error);
        } finally {
            setName("");
        }
    }

    const findFather = () => {
        const fatherNode = [];
        let currentNode: any = findNodeById(currentDirectoryId);
        
        while (currentNode) {
            fatherNode.unshift(currentNode);
            if (currentNode.id === "root") {
                break;
            }
            let nextNode = null;
            if (tree) {
                const findParent = (node: any, targetId: string): any => {
                    if (node.children) {
                        for (const child of node.children) {

                            if (child.id === targetId) {
                                return node;
                            }

                            const result = findParent(child, targetId);

                            if (result) {
                                return result;
                            }
                        }
                    }
                    return null;
                };
                nextNode = findParent(tree, currentNode.id);
            }
            currentNode = nextNode;
        }
        
        return fatherNode;
    };

    const fatherNode = tree ? findFather() : [];
    const currentNode = tree ? (findNodeById(currentDirectoryId) as NaryNodeDirectory | null) : null;
    const isCurrentDirectory = currentNode && 'children' in currentNode;

    return (
        <div className="explorer-page">
            <h2 className="explorer-title">Explorador de Archivos</h2>
            
            {!tree ? (
                <p>Cargando árbol...</p>
            ) : (
                <>
                    <div className="explorer-breadcrumb">
                        <span className="explorer-breadcrumb__label">Ubicación: </span>
                        {fatherNode.map((node: any, index: number) => (
                            <span className="explorer-breadcrumb__item" key={node.id}>
                                {index > 0 && <span className="explorer-breadcrumb__separator">/</span>}
                                <button
                                    onClick={() => setCurrentDirectoryId(node.id)}
                                    className={`explorer-breadcrumb__button ${node.id === currentDirectoryId ? "is-current" : ""}`}
                                >
                                    {node.name}
                                </button>
                            </span>
                        ))}
                    </div>

                    {isCurrentDirectory && (
                        <form className="explorer-form" onSubmit={handlerSubmit}>
                            <select 
                                value={type} 
                                onChange={(e) => setType(e.target.value as ItemType)}
                                className="explorer-select"
                            >
                                <option value="carpeta">📁 Carpeta</option>
                                <option value="archivo">📄 Archivo</option>
                            </select>

                            <input 
                                type="text" 
                                placeholder="Nombre del archivo o carpeta" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="explorer-input"
                            />

                            <button className="btn btn-primary" type="submit">Agregar</button>
                        </form>
                    )}

                    <h3 className="explorer-content-title">Contenido:</h3>
                    <TreeNode 
                        node={tree} 
                        currentDirectoryId={currentDirectoryId}
                        onSelectDirectory={setCurrentDirectoryId}
                    />
                </>
            )}
        </div>
    )
}