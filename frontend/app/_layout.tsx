import { global, User } from '@/lib/context';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import { isLoggedIn, logout } from '@/lib/auth';
import api from '@/lib/axiosConfig';
import { sortPrescriptions } from '@/lib/utils';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [user, setUser] = useState<User | null>(null);
	const [textSize, setTextSize] = useState<number>(16);
	const [loaded, error] = useFonts({
		SourceBold: require('../assets/fonts/SourceSansPro-Bold.otf'),
		SourceLight: require('../assets/fonts/SourceSansPro-Light.otf'),
		Source: require('../assets/fonts/SourceSansPro-Regular.otf'),
		SourceSemibold: require('../assets/fonts/SourceSansPro-Semibold.otf'),
		...FontAwesome.font
	});

	const router = useRouter();

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		updateUser();
	}, []);

	const updateUser = useCallback(async () => {
		const loggedIn = await isLoggedIn();

		if (loggedIn) {
			const user = await api
				.get('/me')
				.then((res) => res.data)
				.catch(async (err) => {
					await logout();
					router.replace('/');
				});

			user.prescriptions = sortPrescriptions(user.prescriptions);

			setUser(user);
		}
	}, []);

	if (!loaded) {
		return null;
	}

	return (
		<global.Provider value={{ user, textSize, setTextSize, updateUser }}>
			<Stack screenOptions={{ headerShown: false }} />
		</global.Provider>
	);
}

