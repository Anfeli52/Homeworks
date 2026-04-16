export type NaryNodeDirectory = {
    id: string;
    name: string;
    children?: NaryNodeDirectory[] | NaryNodeFile[];
}

export type NaryNodeFile = {
    id: string;
    name: string;
}