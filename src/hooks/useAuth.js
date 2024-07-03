import { useContext, useDebugValue } from 'react';
import { ModalContext } from '~/components/ModalProvider';

export const useAuth = () => {
    const { auth } = useContext(ModalContext);
    useDebugValue(auth, (auth) => (auth?.user ? 'Logged In' : 'Logged Out'));
    return useContext(ModalContext);
};
