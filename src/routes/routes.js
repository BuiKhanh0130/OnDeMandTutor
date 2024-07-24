import config from '~/config';

import Home from '~/pages/Home';
import Blog from '~/pages/Blog';
import Tutor from '~/pages/Tutor';
import StudentProfile from '~/pages/Profile/StudentProfile';
import TutorProfile from '~/pages/Profile/TutorProfile';
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
import Messages from '~/pages/Messages';
import Notification from '~/pages/Notification';
import BecomeStudent2 from '~/pages/BecomeStudent2/BecomStudent2';
import MainDash from '~/pages/MainDash';
import Moderator from '~/layouts/Moderator';
import Rehearsal from '~/pages/Rehearsal';
import Classes from '~/pages/Classes';
import RequestForm from '~/pages/RequestForm';
import MyPost from '~/pages/MyPost';
import RequestOfTutor from '~/pages/RequestOfTutor';
import GenerateClass from '~/pages/GenerateClass';
import MyApplyPost from '~/pages/MyApplyPost';
import Wallet from '~/pages/Wallet';
import ClassTutor from '~/pages/ClassTutor';
import RequestOfStudent from '~/pages/RequestOfStudent';
import ViewComplaint from '~/pages/ViewComplaint';
import Successful from '~/pages/Successful';
import AdvertisementModerator from '~/pages/AdversementModerator/AdvertisementModerator';
import Admin from '~/layouts/Admin';
import BanAccount from '~/pages/BanAccount';
import AccountAdmin from '~/pages/Account/AccountAdmin';
import AccountModerator from '~/pages/Account/AccountModerator';
import Feedback from '~/pages/Feedback';
import WalletStudent from '~/pages/WalletStudent';
import WithdrawalRequest from '~/pages/WithdrawalRequest';

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
];

const privateRoutes = [
    { path: config.routes.home, component: Home, role: ['Student', 'Tutor', 'Moderator'] },
    { path: config.routes.main, component: Main, layout: Admin, role: ['Administrator'] },
    { path: config.routes.registrationTutor1, component: BecomeTutor, layout: Registration, role: ['Student'] },
    { path: config.routes.registrationTutor2, component: BecomeTutor2, layout: Registration, role: ['Student'] },
    { path: config.routes.findTutor, component: FindTutor, role: ['Student'] },
    { path: config.routes.requestTutor, component: RequestTutor, role: ['Student'] },
    { path: config.routes.account, component: Tutor, role: ['Student', 'Tutor', 'Administrator'] },
    { path: config.routes.requestTutor, component: RequestTutor, role: ['Student'] },
    { path: config.routes.onlineTutoring, component: OnlineTutoring, role: ['Student', 'Administrator'] },
    { path: config.routes.forStudent, component: ForStudent, role: ['Student', 'Tutor'] },
    { path: config.routes.customerSay, component: CustomerSay, role: ['Student', 'Tutor'] },
    { path: config.routes.blog, component: Blog, role: ['Tutor'] },
    { path: config.routes.advertisement, component: Advertisement, role: ['Tutor', 'Student'] },
    { path: config.routes.howItWork, component: HowItWork, role: ['Student', 'Tutor'] },
    { path: config.routes.profileStudent, component: StudentProfile, layout: HeaderOnly, role: ['Student'] },
    { path: config.routes.profileTutor, component: TutorProfile, layout: HeaderOnly, role: ['Tutor'] },
    { path: config.routes.aboutUs, component: AboutUs, role: ['Student', 'Tutor'] },
    { path: config.routes.learnMore, component: LearnMore, role: ['Student', 'Tutor'] },
    { path: config.routes.transaction, component: Transaction, role: ['Student'] },
    { path: config.routes.payment, component: Payment, layout: Transaction, role: ['Student'] },
    { path: config.routes.history, component: History, layout: Transaction, role: ['Student'] },
    { path: config.routes.tipSuccess, component: TipSuccess, role: ['Student', 'Tutor'] },
    { path: config.routes.dashboardTutor, component: DashboardTutor, role: ['Tutor'] },
    { path: config.routes.feedbackHistory, component: FeedbackHistory, role: ['Tutor', 'Student'] },
    { path: config.routes.unauthorized, component: Unauthorized, layout: null, role: ['Student', 'Tutor', 'Admin'] },
    { path: config.routes.messages, component: Messages, layout: null, role: ['Student', 'Tutor'] },
    { path: config.routes.notification, component: Notification, role: ['Student', 'Tutor'] },
    { path: config.routes.moderator, component: Rehearsal, layout: Moderator, role: ['Moderator'] },
    { path: config.routes.modeClass, component: MainDash, layout: Moderator, role: ['Moderator'] },
    { path: config.routes.classes, component: Classes, role: ['Student'] },
    { path: config.routes.classTutor, component: ClassTutor, role: ['Tutor'] },
    { path: config.routes.requestForm, component: RequestForm, role: ['Student'] },
    { path: config.routes.myPost, component: MyPost, role: ['Student'] },
    { path: config.routes.requestOfTutor, component: RequestOfTutor, role: ['Tutor'] },
    { path: config.routes.generateClass, component: GenerateClass, role: ['Tutor'] },
    { path: config.routes.myApplyFormTutor, component: MyApplyPost, role: ['Tutor'] },
    { path: config.routes.wallet, component: Wallet, role: ['Tutor', 'Student', 'Moderator'] },
    { path: config.routes.requestOfStudent, component: RequestOfStudent, role: ['Student'] },
    { path: config.routes.viewComplaint, component: ViewComplaint, layout: 'null', role: ['Student', 'Tutor'] },
    { path: config.routes.success, component: Successful, layout: 'null', role: ['Student', 'Tutor'] },
    { path: config.routes.feedback, component: Feedback, role: ['Student'] },
    { path: config.routes.walletStudent, component: WalletStudent, role: ['Student'] },
    {
        path: config.routes.advertisementModerator,
        component: AdvertisementModerator,
        layout: Moderator,
        role: ['Moderator'],
    },
    {
        path: config.routes.withdrawalRequest,
        component: WithdrawalRequest,
        layout: Moderator,
        role: ['Moderator'],
    },
    { path: config.routes.ban, component: BanAccount, layout: Admin, role: ['Administrator'] },
    { path: config.routes.accountAdmin, component: AccountAdmin, layout: Admin, role: ['Administrator'] },
    { path: config.routes.accountModerator, component: AccountModerator, layout: Admin, role: ['Administrator'] },
];

export { publicRoutes, privateRoutes };
