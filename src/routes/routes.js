import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Student from '~/pages/Account/Student';
import Tutor from '~/pages/Account/Tutor';
import FindTutor from '~/pages/FindTutor';
import Registration from '~/pages/Registration';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.registration, component: Registration },
    { path: config.routes.findtutor, component: FindTutor },
    { path: config.routes.account, component: Tutor },
    { path: config.routes.account, component: Student },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
