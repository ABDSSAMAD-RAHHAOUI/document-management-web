import axios from 'axios';
import { useQuery } from 'react-query';

const API_BASE_URL = 'http://localhost:8085/api/v1/document';
const token = localStorage.getItem('token');

export function useGetSharedFiles() {
    return useQuery('sharedFiles', async () => {
        const response = await axios.get(`${API_BASE_URL}/shared`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    });
}