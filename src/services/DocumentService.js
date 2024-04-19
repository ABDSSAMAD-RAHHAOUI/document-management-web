import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

const API_BASE_URL = 'http://localhost:8085/api/v1';
const token = localStorage.getItem('token');

export function useGetDocuments(searchQuery) {
    return useQuery(['documents', searchQuery], async () => {
        const response = await axios.get(`${API_BASE_URL}/document`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { searchName: searchQuery }
        });
        return response.data;
    });
}

export function useCreateDocument() {
    return useMutation(async (formData) => {
        const response = await axios.post(`${API_BASE_URL}/document`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    });
}

export function useDownloadDocument() {
    return useMutation(async ({ documentUUID, type }) => {
        const response = await axios.get(`${API_BASE_URL}/document/downloadFile/${documentUUID}`, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const blob = new Blob([response.data], { type: `application/${type}` });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `document_${documentUUID}.${type}`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        return response.data;
    });
}

export function useDeleteDocument() {
    return useMutation(async (documentUUID) => {
        const response = await axios.delete(`${API_BASE_URL}/document/${documentUUID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    });
}
