import useRequestsPrivate from './useRequestPrivate';
import { useAuth } from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();
    const requestsPrivate = useRequestsPrivate();

    const logout = async () => {
        try {
            const response = await requestsPrivate.delete('/auth/signOut', {
                withCredentials: true,
            });
            if (response?.status) {
                setAuth({});
                localStorage.removeItem('accessToken');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
