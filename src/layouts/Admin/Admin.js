import HeaderAdmin from './components/HeaderAdmin';
import Sidebar from '../Admin/components/Sidebar';
import Main from '~/pages/Main';

import Footer from './components/Footer';

function Admin({ children }) {
    return (
        <>
            <HeaderAdmin />
            <Sidebar />
            <Main />
            <Footer />
        </>
    );
}

export default Admin;
