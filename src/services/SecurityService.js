import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

const API_BASE_URL = 'http://localhost:8085/api/v1/auth';

export function useLogin() {
    return useMutation(async ({ email, password }) => {
        const response = await axios.post(`${API_BASE_URL}/authenticate`, { email, password });
        localStorage.setItem('token', response.data.access_token);
    });
}

export function useLogout() {
    return useMutation(async () => {
        localStorage.removeItem('token');
    });
}

export function useIsLoggedIn() {
    return useQuery('isLoggedIn', () => !!localStorage.getItem('token'));
}

export function useGetToken() {
    return useQuery('token', () => localStorage.getItem('token'));
}
