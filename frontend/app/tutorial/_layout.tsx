import { Tab, tutorial } from '@/lib/context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarIconProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export default function HomeLayout() {
	const [targetTab, setTargetTab] = useState<Tab>('index');

	return (
		<tutorial.Provider value={{ target: setTargetTab }}>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: '#9D8FFF',
					tabBarInactiveTintColor: '#A0A0A0'
				}}>
				<Tabs.Screen
					name="index"
					options={{
						title: 'Home',
						tabBarButton: (props: any) => <TouchableOpacity {...props} disabled={targetTab !== 'index'} />,
						tabBarIcon: ({ color, size }: BottomTabBarIconProps) => <Ionicons name="home-outline" color={color} size={size} />
					}}
				/>
				<Tabs.Screen
					name="history"
					options={{
						title: 'Journey',
						tabBarButton: (props: any) => <TouchableOpacity {...props} disabled={targetTab !== 'history'} />,
						tabBarIcon: ({ color, size }: BottomTabBarIconProps) => <Ionicons name="walk-outline" color={color} size={size} />
					}}
				/>
				<Tabs.Screen
					name="documents"
					options={{
						title: 'Records',
						tabBarButton: (props: any) => <TouchableOpacity {...props} disabled={targetTab !== 'documents'} />,
						tabBarIcon: ({ color, size }: BottomTabBarIconProps) => <Ionicons name="document-text-outline" color={color} size={size} />
					}}
				/>
			</Tabs>
		</tutorial.Provider>
	);
}

