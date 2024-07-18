import { useAuth } from './useAuth';
import { jwtDecode } from 'jwt-decode';
import requests from '~/utils/request';

const useRefreshToken = () => {
    const { setAvatar, setAuth, setUserId } = useAuth();

    const refreshToken = async () => {
        const accessToken = sessionStorage.getItem('accessToken');
        const refreshToken = JSON.parse(accessToken).refreshToken;
        const userId = jwtDecode(accessToken).UserId;
        const avatar = jwtDecode(accessToken).Avatar;
        const fullName = jwtDecode(accessToken).FullName;
        setUserId(userId);
        setAvatar({ avatar, fullName });

        console.log();

        try {
            const response = await requests.post('auth/refresh_token', JSON.stringify({ refreshToken, userId }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            sessionStorage.setItem('accessToken', JSON.stringify(response?.data));
            setAuth((prev) => {
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
