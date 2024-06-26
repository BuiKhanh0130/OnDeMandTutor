import { useContext, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { auth as Auth } from '~/firebase/firebase';

import { requestsPrivate } from '~/utils/request';
import useRefreshToken from './useRefreshToken';
import { ModalContext } from '~/components/ModalProvider';

const useRequestsPrivate = () => {
    const refresh = useRefreshToken();
    const context = useContext(ModalContext);
    const auth = context.auth;
    const method = localStorage.getItem('loginMethod');

    useEffect(() => {
        const requestIntercept = requestsPrivate.interceptors.request.use(
            async (config) => {
                let currentUser = null;
                if (method === 'google') {
                    currentUser = Auth.currentUser;
                }
                if (currentUser) {
                    const token = await currentUser.getIdToken();
                    config.headers.Authorization = `Bearer ${token}`;
                } else if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken?.token}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = requestsPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 || (error?.response?.status === 500 && !prevRequest?.sent)) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return requestsPrivate(prevRequest);
                }
                return Promise.reject(error);
            },
        );
        return () => {
            requestsPrivate.interceptors.request.eject(requestIntercept);
            requestsPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return requestsPrivate;
};

export default useRequestsPrivate;
