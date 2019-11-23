// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import { ListWrap, ListItem } from './Styles';

type Props = {
    items: Array<{ name: string, url: string }>,
};

const BreadcrumbList = ({ items }: Props) => {
    const list = items.map((item) => {
        if (item.url) {
            return (
                <ListItem key={item.name}>
                    <Link title={item.name} to={item.url}>
                        {item.name}
                    </Link>
                </ListItem>
            );
        }

        return <ListItem key={item.name}>{item.name}</ListItem>;
    });

    return <ListWrap>{list}</ListWrap>;
};

export default BreadcrumbList;
