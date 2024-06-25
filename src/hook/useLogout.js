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
        const method = localStorage.getItem('loginMethod');
        try {
            if (method === 'account') {
                const response = await requestsPrivate.delete('/auth/signOut', {
                    withCredentials: true,
                });
                if (response?.status) {
                    setAuth({});
                    handleHiddenUser();
                    localStorage.removeItem('accessToken');
                }
            } else {
                await auth.signOut();
                setAuth({});
                localStorage.removeItem('accessToken');
                handleHiddenUser();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
