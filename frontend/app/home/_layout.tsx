import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function HomeLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#9D8FFF',
				tabBarInactiveTintColor: '#A0A0A0',
				tabBarStyle: {
					paddingTop: 5,
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.25
				}
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						<Ionicons name={focused ? 'home' : 'home-outline'} color={focused ? '#6C63FF' : '#787878'} size={24} />
					)
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: 'Journey',
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						<Ionicons name={focused ? 'walk' : 'walk-outline'} color={focused ? '#6C63FF' : '#787878'} size={24} />
					)
				}}
			/>
			<Tabs.Screen
				name="documents"
				options={{
					title: 'Records',
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						<Ionicons name={focused ? 'document-text' : 'document-text-outline'} color={focused ? '#6C63FF' : '#787878'} size={24} />
					)
				}}
			/>
		</Tabs>
	);
}

