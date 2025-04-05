import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { SplashScreen, useRouter } from 'expo-router';
import { isLoggedIn } from '../lib/auth';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SourceBold: require('../assets/fonts/SourceSansPro-Bold.otf'),
		SourceLight: require('../assets/fonts/SourceSansPro-Light.otf'),
		Source: require('../assets/fonts/SourceSansPro-Regular.otf'),
		SourceSemibold: require('../assets/fonts/SourceSansPro-Semibold.otf'),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		
	}, []);

	if (!loaded) {
		return null;
	}

	return <Stack screenOptions={{ headerShown: false }} />;
}
