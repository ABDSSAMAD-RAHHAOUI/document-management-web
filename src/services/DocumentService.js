import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

const API_BASE_URL = 'http://localhost:8085/api/v1';
const token = localStorage.getItem('token');

export function useGetDocuments() {
    return useQuery('documents', async () => {
        const response = await axios.get(`${API_BASE_URL}/document`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    });
}

export function useCreateDocument() {
    return useMutation(async (newDocument) => {
        const response = await axios.post(`${API_BASE_URL}/document`, newDocument);
        return response.data;
    });
}
