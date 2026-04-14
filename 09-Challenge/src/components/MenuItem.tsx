import { useState } from "react";
import { Link } from "react-router-dom";
import { NaryNode } from "../utils/NaryNode";

interface MenuItemProps {
    item: NaryNode;
}

export const MenuItem = ({ item }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children.length > 0;

    const toggleSubmenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li style={{ listStyle: 'none' }}>
            {item.link && !hasChildren ? (
                <Link to={item.link}>
                    {item.title}
                </Link>
            ) : (
                <div onClick={hasChildren ? toggleSubmenu : undefined}>
                    {item.title}
                    {hasChildren && (isOpen ? ' [-]' : ' [+]')}
                </div>
            )}

            {hasChildren && isOpen && (
                <ul>
                    {item.children.map((child, index) => (
                        <MenuItem key={child.id ?? index} item={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};