import { Stack, useLocalSearchParams, } from 'expo-router';
import { global, Prescription } from '@/lib/context';
import MedicineCard from '@/components/MedicineCard';
import Title from '@/components/Title';
import TopBar from '@/components/TopBar';
import { useRouter } from 'expo-router';
import { DateTime } from 'luxon';
import { ImageBackground, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import ReactNativeCalendarEvents from 'react-native-calendar-events';
import calendar from 'react-native-calendar-events';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Checkmark from '@/components/svgs/Checkmark';
import Clock from '@/components/svgs/Clock';
import { useState, useEffect, useContext } from 'react';

export default function ExtraScreen() {
	const [prescription, setPrescription] = useState<Prescription>();

	const router = useRouter();

	const { id } = useLocalSearchParams();
	const { user } = useContext(global);

	useEffect(() => {
		const arr = [...user!.prescriptions[0], ...user!.prescriptions[1], ...user!.prescriptions[2]];
		setPrescription(arr.find((pre) => pre.id == id));
	}, []);

	return (
		<ImageBackground source={require('../assets/images/bg.png')} imageStyle={{ resizeMode: 'cover' }} style={{ height: '100%', width: '100%' }}>
			<SafeAreaView style={styles.container}>
                
				<TopBar />
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
					<Title>Today's Meds</Title>
				
				</KeyboardAwareScrollView>
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
	},
});
