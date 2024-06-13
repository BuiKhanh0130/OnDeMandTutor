import config from '~/config';

import Home from '~/pages/Home';
import Blog from '~/pages/Blog';
import Tutor from '~/pages/Tutor';
import Student from '~/pages/Student';
import AboutUs from '~/pages/AboutUs';
import Payment from '~/pages/Pay';
import History from '~/pages/History';
import HowItWork from '~/pages/HowItWork';
import ForStudent from '~/pages/ForStudent';
import Transaction from '~/layouts/Transaction';
import HeaderOnly from '~/layouts/HeaderOnly';
import CustomerSay from '~/pages/CustomerSay';
import FindTutor from '~/pages/SearchForTutor';
import RequestTutor from '~/pages/RequestTutor';
import Registration from '~/layouts/Registration';
import Advertisement from '~/pages/Advertisement';
import OnlineTutoring from '~/pages/OnlineTutoring';
import BecomeTutor from '~/pages/BecomeTutor';
import BecomeStudent from '~/pages/BecomeStudent';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.registrationTutor, component: BecomeTutor, layout: Registration },
    { path: config.routes.registrationStudent, component: BecomeStudent, layout: Registration },
    { path: config.routes.findTutor, component: FindTutor },
    { path: config.routes.account, component: Tutor },
    { path: config.routes.requestTutor, component: RequestTutor },
    { path: config.routes.onlineTutoring, component: OnlineTutoring },
    { path: config.routes.forStudent, component: ForStudent },
    { path: config.routes.customerSay, component: CustomerSay },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.advertisement, component: Advertisement },
    { path: config.routes.howItWork, component: HowItWork },
    { path: config.routes.accountStudent, component: Student, layout: HeaderOnly },
    { path: config.routes.aboutUs, component: AboutUs },
    { path: config.routes.transaction, component: Transaction },
    { path: config.routes.payment, component: Payment, layout: Transaction },
    { path: config.routes.history, component: History, layout: Transaction },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
