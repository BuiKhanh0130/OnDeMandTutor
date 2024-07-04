import { Outlet } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import useRefreshToken from '~/hooks/useRefreshToken';
import { useAuth } from '~/hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    // const [persist] = useLocalStorage('persist', false);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
                handleUser();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        !auth?.accessToken?.token ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading, auth?.accessToken]);

    return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
