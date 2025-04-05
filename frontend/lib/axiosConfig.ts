import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BACKEND_URL
});

api.interceptors.request.use(
	async (config) => {
		const token = await SecureStore.getItemAsync('userToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;

