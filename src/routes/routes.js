import config from '~/config';

import Home from '~/pages/Home';
import Blog from '~/pages/Blog';
import Tutor from '~/pages/Tutor';
import StudentProfile from '~/pages/StudentProfile';
import AboutUs from '~/pages/AboutUs';
import Payment from '~/pages/Pay';
import History from '~/pages/History';
import HowItWork from '~/pages/HowItWork';
import ForStudent from '~/pages/ForStudent';
import Transaction from '~/layouts/components/Transaction';
import HeaderOnly from '~/layouts/components/HeaderOnly';
import Main from '~/pages/Main';
import BecomeTutor2 from '~/pages/BecomeTutor2';
import DashboardTutor from '~/pages/DashboardTutor';
import FeedbackHistory from '~/pages/FeedbackHistory';
import CustomerSay from '~/pages/CustomerSay';
import FindTutor from '~/pages/SearchForTutor';
import RequestTutor from '~/pages/RequestTutor';
import Registration from '~/components/Registration';
import Advertisement from '~/pages/Advertisement';
import OnlineTutoring from '~/pages/OnlineTutoring';
import BecomeTutor from '~/pages/BecomeTutor';
import BecomeStudent from '~/pages/BecomeStudent';
import LearnMore from '~/pages/LearnMore';
import TipSuccess from '~/pages/TipSuccess';
import Unauthorized from '~/pages/Unauthorized';
import HeaderNotSideBar from '~/layouts/components/HeaderNotSideBar';
import Messages from '~/pages/Messages';
import Notification from '~/pages/Notification';
import BecomeStudent2 from '~/pages/BecomeStudent2/BecomStudent2';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.registrationTutor1, component: BecomeTutor, layout: Registration },
    { path: config.routes.registrationTutor2, component: BecomeTutor2, layout: Registration },
    { path: config.routes.registrationStudent1, component: BecomeStudent, layout: Registration },
    { path: config.routes.registrationStudent2, component: BecomeStudent2, layout: Registration },
    { path: config.routes.findTutor, component: FindTutor },
    { path: config.routes.account, component: Tutor },
    { path: config.routes.onlineTutoring, component: OnlineTutoring },
    { path: config.routes.forStudent, component: ForStudent },
    { path: config.routes.customerSay, component: CustomerSay },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.advertisement, component: Advertisement },
    { path: config.routes.howItWork, component: HowItWork },
    { path: config.routes.aboutUs, component: AboutUs },
    { path: config.routes.learnMore, component: LearnMore },
    { path: config.routes.tipSuccess, component: TipSuccess },
    { path: config.routes.messages, component: Messages },
];

const privateRoutes = [
    { path: config.routes.home, component: Home, role: ['Student', 'Tutor'] },
    { path: config.routes.main, component: Main, role: ['Tutor'] },
    { path: config.routes.registrationTutor1, component: BecomeTutor, layout: Registration, role: ['Student'] },
    { path: config.routes.registrationTutor2, component: BecomeTutor2, layout: Registration, role: ['Student'] },
    { path: config.routes.findTutor, component: FindTutor, role: ['Student'] },
    { path: config.routes.requestTutor, component: RequestTutor, role: ['Student'] },
    { path: config.routes.account, component: Tutor, role: ['Tutor', 'Admin', 'Student'] },
    { path: config.routes.requestTutor, component: RequestTutor, role: ['Student'] },
    { path: config.routes.onlineTutoring, component: OnlineTutoring, role: ['Student', 'Admin'] },
    { path: config.routes.forStudent, component: ForStudent, role: ['Student'] },
    { path: config.routes.customerSay, component: CustomerSay, role: ['Student', 'Admin'] },
    { path: config.routes.blog, component: Blog, role: ['Student', 'Tutor'] },
    { path: config.routes.forStudent, component: ForStudent, role: ['Student'] },
    { path: config.routes.advertisement, component: Advertisement, role: ['Tutor, Student'] },
    { path: config.routes.howItWork, component: HowItWork, role: ['Student', 'Tutor'] },
    { path: config.routes.accountStudent, component: StudentProfile, layout: HeaderOnly, role: ['Student'] },
    { path: config.routes.aboutUs, component: AboutUs, role: ['Student', 'Tutor'] },
    { path: config.routes.learnMore, component: LearnMore, role: ['Student', 'Tutor'] },
    { path: config.routes.transaction, component: Transaction, role: ['Student'] },
    { path: config.routes.payment, component: Payment, layout: Transaction, role: ['Student'] },
    { path: config.routes.history, component: History, layout: Transaction, role: ['Student'] },
    { path: config.routes.tipSuccess, component: TipSuccess, role: ['Student', 'Tutor'] },
    { path: config.routes.dashboardTutor, component: DashboardTutor, role: ['Tutor'] },
    { path: config.routes.feedbackHistory, component: FeedbackHistory, role: ['Tutor', 'Student'] },
    { path: config.routes.unauthorized, component: Unauthorized, layout: null, role: ['Student', 'Tutor', 'Admin'] },
    { path: config.routes.messages, component: Messages, role: ['Student', 'Tutor'] },
    { path: config.routes.notification, component: Notification, role: ['Student', 'Tutor'] },
];

export { publicRoutes, privateRoutes };
