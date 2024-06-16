import HeaderAdmin from './components/HeaderAdmin';
import Sidebar from '../Admin/components/Sidebar';
import Main from './components/Sidebar/Main';

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
