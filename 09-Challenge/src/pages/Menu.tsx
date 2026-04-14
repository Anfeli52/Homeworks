import { MenuItem } from "../components/MenuItem";
import { NaryNode } from "../utils/NaryNode";

interface MenuProps {
    root: NaryNode | null;
}

export const Menu = ({ root }: MenuProps) => {
    if (!root) return null;

    return (
        <nav>
            <ul>
                {root.children.map((item, index) => (
                    <MenuItem key={item.id ?? index} item={item} />
                ))}
            </ul>
        </nav>
    );
};