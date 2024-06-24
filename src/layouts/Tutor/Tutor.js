import HeaderTutor from './components/HeaderTutor/HeaderTutor';
import FooterTutor from './components/FooterTutor/FooterTutor';
import { ScrollToTop } from '~/components/ScrollToTop';

function Tutor({ children }) {
    return (
        <div>
            <HeaderTutor />
            {children}
            <ScrollToTop />
            <FooterTutor />
        </div>
    );
}

export default Tutor;
