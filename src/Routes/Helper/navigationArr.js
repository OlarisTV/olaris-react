const navigationArr = [
    {
        name: 'Libraries',
        id: 'libraries',
        admin: false,
        links: [
            {
                name: 'Dashboard',
                to: '/dashboard',
                id: 'dashboard',
            },
            {
                name: 'Movies',
                to: '/movies',
                id: 'movies',
                submenu: [
                    {
                        name: 'Unmatched',
                        to: '/movies/unmatched',
                        id: 'unmatched-movies',
                    },
                ],
            },
            {
                name: 'TV Shows',
                to: '/series',
                id: 'series',
                submenu: [
                    {
                        name: 'Unmatched',
                        to: '/episodes/unmatched',
                        id: 'unmatched-episodes',
                    },
                ],
            },
        ],
    },
    {
        name: 'Settings',
        id: 'settings',
        admin: true,
        links: [
            {
                name: 'Users',
                to: '/users',
                id: 'users',
            },
        ],
    },
];

export default navigationArr;
