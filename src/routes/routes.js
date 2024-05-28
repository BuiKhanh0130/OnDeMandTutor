import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Account from '~/pages/Account';
import Registration from '~/pages/Registration';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.account, component: Account, layout: null },
    { path: config.routes.registration, component: Registration },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
