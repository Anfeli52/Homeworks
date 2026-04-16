import { useState } from "react";
import type { NaryNodeDirectory } from "../types/NaryNodeTypes";

export const TreeNode = ({ node, currentDirectoryId, onSelectDirectory }: { node: NaryNodeDirectory | any; currentDirectoryId: string; onSelectDirectory: (id: string) => void }) => {
    const isDirectory = node.children !== undefined;
    const isCurrentDirectory = node.id === currentDirectoryId;
    const [isOpen, setIsOpen] = useState(false);

    const handleNodeClick = () => {
        if (!isDirectory) {
            return;
        }

        if (isCurrentDirectory) {
            setIsOpen(!isOpen);
            return;
        }

        onSelectDirectory(node.id);
        setIsOpen(true);
    };

    return (
        <div className="tree-node">
            <div
                className={`tree-node__row ${isDirectory ? "is-directory" : ""} ${isCurrentDirectory ? "is-current" : ""}`}
                onClick={handleNodeClick}
            >
                <span>{isDirectory ? (isOpen ? "📂" : "📁") : "📄"}</span>
                <span className="tree-node__name">{node.name}</span>
            </div>
            {isDirectory && isOpen && node.children && node.children.length > 0 && (
                <div className="tree-node__children">
                    {node.children.map((child: any) => (
                        <TreeNode 
                            key={child.id} 
                            node={child} 
                            currentDirectoryId={currentDirectoryId}
                            onSelectDirectory={onSelectDirectory}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};