// @flow
import React from 'react';

import BreadcrumbList from './BreadcrumbList';

type Series = {
    name: string,
    uuid: string,
};

type Season = {
    name: string,
    uuid: string,
    series: Series,
};

type Props = {
    type: string,
    name: string,
    series?: Series,
    season?: Season,
};

const Breadcrumbs = ({ type, season, name, series }: Props) => {
    switch (type) {
        case 'Episode': {
            const items = [
                { name: 'TV Shows', url: '/series' },
                {
                    name: season.series.name,
                    url: `/series/${season.series.uuid}`,
                },
                { name: season.name, url: `/season/${season.uuid}` },
                { name },
            ];

            return <BreadcrumbList items={items} />;
        }
        case 'Season': {
            const items = [
                { name: 'TV Shows', url: '/series' },
                { name: series.name, url: `/series/${series.uuid}` },
                { name },
            ];

            return <BreadcrumbList items={items} />;
        }
        case 'Series': {
            const items = [{ name: 'TV Shows', url: '/series' }, { name }];

            return <BreadcrumbList items={items} />;
        }
        case 'Movie': {
            const items = [{ name: 'Movies', url: '/movies' }, { name }];

            return <BreadcrumbList items={items} />;
        }
        default:
            return false;
    }
};

Breadcrumbs.defaultProps = {
    season: {},
    series: {},
};

export default Breadcrumbs;
