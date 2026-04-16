import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { NaryNodeDirectory, NaryNodeFile } from "../types/NaryNodeTypes";
import { useAuth } from "./AuthContext";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/credentials";

interface ExplorerContextType {
    addDirectory: (parentId: string, name: string) => Promise<void>;
    addFile: (parentId: string, name: string) => Promise<void>;
    tree: NaryNodeDirectory | null;
    findNodeById: (nodeId: string) => NaryNodeDirectory | NaryNodeFile | null;
}

export const ExplorerContext = createContext<ExplorerContextType | undefined>(undefined);

export const ExplorerProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [tree, setTree] = useState<NaryNodeDirectory | null>(null);

    useEffect(() => {
        const loadTreeFromDB = async () => {
            if (!user?.email) {
                setTree(null);
                return;
            }

            try {
                const userDocRef = doc(db, "users", user.email);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    console.warn("Usuario no registrado en la base de datos.");
                    return;
                }

                const treeDocRef = doc(db, "explorers", user.email);
                const treeDoc = await getDoc(treeDocRef);

                if (treeDoc.exists()) {
                    setTree(treeDoc.data().tree as NaryNodeDirectory);
                } else {
                    const defautTree: NaryNodeDirectory = {
                        id: "root",
                        name: "Root",
                        children: [],
                    };
                    setTree(defautTree);
                    await setDoc(treeDocRef, { tree: defautTree, updatedAt: serverTimestamp(), ownerEmail: user.email });
                }
            } catch (error) {
                console.error("Error cagando el árbol desde la BD:", error);
            }
        };

        loadTreeFromDB();
    }, [user?.email]);

    const clearTree = (node: NaryNodeDirectory | NaryNodeFile): any => {
        const erraser: any = {
            id: node.id,
            name: node.name,
        };

        const isDirectory = (n: any): n is NaryNodeDirectory => n.children !== undefined;
        if (isDirectory(node) && node.children) {
            erraser.children = node.children.map(clearTree);
        }

        return erraser;
    };

    const saveTreeToDB = async (treeToSave: NaryNodeDirectory) => {
        if (!user?.email) {
            throw new Error("Usuario no autenticado.");
        }

        try {
            const treeDocRef = doc(db, "explorers", user.email);
            const sanitized = clearTree(treeToSave);
            await setDoc(treeDocRef, { tree: sanitized, updatedAt: serverTimestamp(), ownerEmail: user.email }, { merge: true });
        } catch (error) {
            console.error("Error guardando árbol a BD:", error);
            throw error;
        }
    };

    const addDirectory = async (parentId: string, name: string) => {
        if (!user?.email) {
            throw new Error("Usuario no autenticado.");
        }

        const userDocRef = doc(db, "users", user.email);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            throw new Error("Usuario no registrado en la base de datos.");
        }

        const newDirectory: NaryNodeDirectory = {
            id: crypto.randomUUID(),
            name,
            children: [],
        };

        setTree(prev => {
            if (!prev) {
                const newTree: NaryNodeDirectory = {
                    id: "root",
                    name: "Root",
                    children: [newDirectory],
                };
                saveTreeToDB(newTree).catch(err => console.error("Error al guardar:", err));
                return newTree;
            } else {
                const addDirRecursively = (node: NaryNodeDirectory): NaryNodeDirectory => {
                    if (node.id === parentId) {
                        return {
                            ...node,
                            children: [...(node.children || []), newDirectory],
                        };
                    }
                    return {
                        ...node,
                        children: node.children?.map(addDirRecursively),
                    } as NaryNodeDirectory;
                };

                const newTree = addDirRecursively(prev);
                saveTreeToDB(newTree).catch(err => console.error("Error al guardar:", err));
                return newTree;
            }
        });
    };

    const addFile = async (parentId: string, name: string) => {
        if (!user?.email) {
            throw new Error("Usuario no autenticado.");
        }

        const userDocRef = doc(db, "users", user.email);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            throw new Error("Usuario no registrado en la base de datos.");
        }

        const newFile: NaryNodeFile = {
            id: crypto.randomUUID(),
            name,
        };

        setTree(prev => {
            if (!prev) {
                const newTree: NaryNodeDirectory = {
                    id: "root",
                    name: "Root",
                    children: [newFile],
                };
                saveTreeToDB(newTree).catch(err => console.error("Error al guardar:", err));
                return newTree;
            } else {
                const addFileRecursively = (node: NaryNodeDirectory): NaryNodeDirectory => {
                    if (node.id === parentId) {
                        return {
                            ...node,
                            children: [...(node.children || []), newFile],
                        };
                    }
                    return {
                        ...node,
                        children: node.children?.map(addFileRecursively),
                    } as NaryNodeDirectory;
                };

                const newTree = addFileRecursively(prev);
                saveTreeToDB(newTree).catch(err => console.error("Error al guardar:", err));
                return newTree;
            }
        });
    };

    const findNodeById = (nodeId: string): NaryNodeDirectory | NaryNodeFile | null => {
        if (!tree) return null;

        const search = (node: NaryNodeDirectory | NaryNodeFile): NaryNodeDirectory | NaryNodeFile | null => {
            if (node.id === nodeId) return node;

            const isDirectory = (n: any): n is NaryNodeDirectory => n.children !== undefined;
            if (isDirectory(node) && node.children) {
                for (const child of node.children) {
                    const result = search(child);
                    if (result) return result;
                }
            }
            return null;
        };

        return search(tree);
    };

    return (
        <ExplorerContext.Provider value={{ addDirectory, addFile, tree, findNodeById }}>
            {children}
        </ExplorerContext.Provider>
    );
};

export const useExplorer = () => {
    const context = useContext(ExplorerContext);
    if (!context) {
        throw new Error("useExplorer debe ser utilizado dentro de un ExplorerProvider");
    }
    return context;
};