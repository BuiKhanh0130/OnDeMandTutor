import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Student from '~/pages/Account/Student';
import Tutor from '~/pages/Account/Tutor';
import FindTutor from '~/pages/SearchForTutor';
import OnlineTutoring from '~/pages/OnlineTutoring';
import ForStudent from '~/pages/ForStudent';
import RequestTutor from '~/pages/RequestTutor';
import Registration from '~/pages/Registration';
import CustomerSay from '~/pages/CustomerSay';
import Blog from '~/pages/Blog';
import Advertisement from '~/pages/Advertisement';
import HowItWork from '~/pages/HowItWork';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.registration, component: Registration },
    { path: config.routes.findTutor, component: FindTutor },
    { path: config.routes.account, component: Tutor },
    { path: config.routes.account, component: Student },
    { path: config.routes.requestTutor, component: RequestTutor },
    { path: config.routes.onlineTutoring, component: OnlineTutoring },
    { path: config.routes.forStudent, component: ForStudent },
    { path: config.routes.customerSay, component: CustomerSay },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.advertisement, component: Advertisement },
    { path: config.routes.howItWork, component: HowItWork },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
