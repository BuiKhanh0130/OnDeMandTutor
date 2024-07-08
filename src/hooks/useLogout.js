import { useContext } from 'react';

import useRequestsPrivate from './useRequestPrivate';
import { useAuth } from './useAuth';
import { auth } from '~/firebase/firebase';
import { ModalContext } from '~/components/ModalProvider';

const useLogout = () => {
    const { setAuth } = useAuth();
    const { handleHiddenUser } = useContext(ModalContext);
    const requestsPrivate = useRequestsPrivate();

    const logout = async () => {
        try {
            const response = await requestsPrivate.delete('/auth/signOut', {
                withCredentials: true,
            });
            await auth.signOut();
            if (response?.status) {
                setAuth({});
                handleHiddenUser();
                sessionStorage.removeItem('accessToken');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
