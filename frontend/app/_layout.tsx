import { global, User } from '@/lib/context';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';

import { isLoggedIn } from '@/lib/auth';
import api from '@/lib/axiosConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [ctxState, setCtxState] = useState<{ user: User | null }>({ user: null });
	const [loaded, error] = useFonts({
		SourceBold: require('../assets/fonts/SourceSansPro-Bold.otf'),
		SourceLight: require('../assets/fonts/SourceSansPro-Light.otf'),
		Source: require('../assets/fonts/SourceSansPro-Regular.otf'),
		SourceSemibold: require('../assets/fonts/SourceSansPro-Semibold.otf'),
		...FontAwesome.font
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		const check = async () => {
			const loggedIn = await isLoggedIn();

			if (loggedIn) {
				const user = await api.get('/me').then((res) => res.data);

				setCtxState((prevState) => ({ ...prevState, user }));
			}
		};

		check();
	}, []);

	if (!loaded) {
		return null;
	}

	return (
		<global.Provider value={ctxState}>
			<Stack screenOptions={{ headerShown: false }} />
		</global.Provider>
	);
}

