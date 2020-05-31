import React, { useState, useEffect, useRef, type Node } from 'react';
import * as S from './Styles';

type Icon = {
    iconName: string,
};

type Props = {
    icon: Icon,
    className: string,
    children: Node,
};

const DropdownMenu = ({ icon, children, className }: Props) => {
    const [open, setOpen] = useState(false);
    const node = useRef();

    const toggleDropdown = (e) => node.current.contains(e.target) && setOpen(false);

    useEffect(() => {
        document.addEventListener('mousedown', toggleDropdown, false);
        document.addEventListener('keydown', toggleDropdown, false);

        return () => {
            document.removeEventListener('mousedown', toggleDropdown, false);
            document.removeEventListener('keydown', toggleDropdown, false);
        };
    }, []);

    return (
        <div ref={node} className={className}>
            <S.DropdownToggle onClick={() => setOpen(!open)}>
                <S.DropdownIcon icon={icon} />
            </S.DropdownToggle>

            {open && <S.DropdownContents>{children}</S.DropdownContents>}
        </div>
    );
};

export default DropdownMenu;
