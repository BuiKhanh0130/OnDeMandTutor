import { useAuth } from './useAuth';
import { jwtDecode } from 'jwt-decode';
import requests from '~/utils/request';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refreshToken = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = JSON.parse(accessToken).refreshToken;
        const userId = jwtDecode(accessToken).UserId;

        try {
            const response = await requests.post(
                'auth/refresh-token',
                JSON.stringify({ refreshToken: refreshToken, userId: userId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            );
            setAuth((prev) => {
                localStorage.setItem('accessToken', JSON.stringify(response?.data));
                return { ...prev, role: jwtDecode(response?.data?.token).UserRole, accessToken: response?.data };
            });
            return response.data.token;
        } catch (error) {
            console.log(error);
        }
    };
    return refreshToken;
};

export default useRefreshToken;
