import requests from '~/utils/request';
import { useAuth } from './useAuth';
import axios from 'axios';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refreshToken = async () => {
        try {
            const refreshToken = auth.refreshToken;
            const response = await axios.post(
                '/https://localhost:7262/api/auth/refresh-token',
                JSON.stringify({ refreshToken }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            );
            console.log(response);
            setAuth((prev) => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return { ...prev, accessToken: response.data.accessToken };
            });
            return response.data.accessToken;
        } catch (error) {
            console.log(error);
        }
    };
    return refreshToken;
};

export default useRefreshToken;
