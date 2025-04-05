import { Tabs } from 'expo-router';

export default function HomeLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen name="index" options={{ title: 'Home' }} />
			<Tabs.Screen name="history" options={{ title: 'Journey' }} />
			<Tabs.Screen name="documents" options={{ title: 'Records' }} />
		</Tabs>
	);
}
