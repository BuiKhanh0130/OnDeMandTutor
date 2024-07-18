import HeaderAdmin from './components/HeaderAdmin';
import Sidebar from '../Admin/components/Sidebar';

import Footer from './components/Footer';

function Admin({ children }) {
    return (
        <>
            <HeaderAdmin />
            <Sidebar />
            {children}
            <Footer />
        </>
    );
}

export default Admin;
