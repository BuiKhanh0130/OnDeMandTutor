import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Account from '~/pages/Account';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.account, component: Account, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
