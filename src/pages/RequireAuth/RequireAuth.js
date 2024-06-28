import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { ModalContext } from '~/components/ModalProvider';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const modal = useContext(ModalContext);
    console.log(auth);

    return allowedRoles.find((allowedRole) => allowedRole === auth?.role) ? (
        <Outlet />
    ) : (
        //changed from user to accessToken to persist login after refresh
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
};

export default RequireAuth;
