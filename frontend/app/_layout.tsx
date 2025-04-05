import { global, User } from '@/lib/context';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect, useState, } from 'react';

import { isLoggedIn, logout } from '@/lib/auth';
import api from '@/lib/axiosConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import { sortPrescriptions } from '@/lib/utils';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [ctxState, setCtxState] = useState<User | null>(null);
	const [loaded, error] = useFonts({
		SourceBold: require('../assets/fonts/SourceSansPro-Bold.otf'),
		SourceLight: require('../assets/fonts/SourceSansPro-Light.otf'),
		Source: require('../assets/fonts/SourceSansPro-Regular.otf'),
		SourceSemibold: require('../assets/fonts/SourceSansPro-Semibold.otf'),
		...FontAwesome.font,
	});

    const router = useRouter();

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		updateUser()
	}, []);

	const updateUser = async () => {
		const loggedIn = await isLoggedIn();

		if (loggedIn) {
			const user = await api.get('/me').then((res) => res.data).catch(async(err) => {
                await logout();
                router.replace('/')
            });

            user.prescriptions = sortPrescriptions(user.prescriptions)


			setCtxState(user);
		}
	};

	if (!loaded) {
		return null;
	}

	return (
		<global.Provider value={{ user: ctxState, updateUser }}>
			<Stack screenOptions={{ headerShown: false }} />
		</global.Provider>
	);
}
