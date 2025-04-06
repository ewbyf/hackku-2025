import MedicineCard from '@/components/MedicineCard';
import Modal from '@/components/Modal';
import PriorityCard from '@/components/PriorityCard';
import PriorityCard2 from '@/components/PriorityCard2';
import Checkmark from '@/components/svgs/Checkmark';
import Clock from '@/components/svgs/Clock';
import Title from '@/components/Title';
import TopBar from '@/components/TopBar';
import { global } from '@/lib/context';
import { useRouter } from 'expo-router';
import { DateTime } from 'luxon';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { default as calendar, default as ReactNativeCalendarEvents } from 'react-native-calendar-events';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;

export default function Home() {
	const router = useRouter();
	const [hasEvent, setHasEvent] = useState(false);

	const { user } = useContext(global);

	useEffect(() => {
		(async () => {
			const permissionStatus = await ReactNativeCalendarEvents.checkPermissions();

			if (permissionStatus !== 'authorized') {
				const newStatus = await ReactNativeCalendarEvents.requestPermissions();
				if (newStatus !== 'authorized') {
					console.warn('Calendar permission not granted');
					return;
				}
			}

			const events = await calendar.fetchAllEvents(DateTime.now().toISODate(), DateTime.now().plus({ days: 30 }).toISODate());

			setHasEvent(
				events.some((evt) =>
					['trip', 'vacation'].some((keyword) =>
						evt.title
							.concat(evt.notes ?? '', evt.description ?? '')
							.toLocaleLowerCase()
							.includes(keyword)
					)
				)
			);
		})();
	}, []);

	return (
		<ImageBackground source={require('../../assets/images/bg.png')} imageStyle={{ resizeMode: 'cover' }} style={{ height: '100%', width: '100%' }}>
			<SafeAreaView style={styles.container}>
				<TopBar />
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
					<Title>Today's Meds</Title>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						style={{ display: 'flex', paddingVertical: 10, width: width }}
						contentContainerStyle={{ gap: 20, paddingRight: 40 }}>
						<PriorityCard2 />
						<PriorityCard />
					</ScrollView>
					{user?.prescriptions[0] && user?.prescriptions[0].length > 0 && (
						<View style={{ gap: 10 }}>
							<View style={styles.titleContainer}>
								<Checkmark color="white" />
								<Text style={styles.sectionTitle}>Ready to Take</Text>
							</View>

							<View style={{ gap: 20, marginBottom: 20 }}>
								{user?.prescriptions[0].map((prescription, i) => (
									<MedicineCard key={i} prescription={prescription} />
								))}
							</View>
						</View>
					)}
					{user?.prescriptions[1] && user?.prescriptions[1].length > 0 && (
						<View style={{ gap: 10 }}>
							<View style={styles.titleContainer}>
								<Clock color="white" />
								<Text style={styles.sectionTitle}>In Progress</Text>
							</View>

							<View style={{ gap: 20, marginBottom: 20 }}>
								{user?.prescriptions[1].map((prescription, i) => (
									<MedicineCard key={i} prescription={prescription} />
								))}
							</View>
						</View>
					)}
					{user?.prescriptions[2] && user?.prescriptions[2].length > 0 && (
						<View style={{ gap: 10 }}>
							<View style={styles.titleContainer}>
								<Icon name="trophy-outline" color="white" size={24} />
								<Text style={styles.sectionTitle}>Finished</Text>
							</View>

							<View style={{ gap: 20 }}>
								{user?.prescriptions[2].map((prescription, i) => (
									<MedicineCard key={i} prescription={prescription} />
								))}
							</View>
						</View>
					)}
				</KeyboardAwareScrollView>
			</SafeAreaView>
			<Modal open onClose={() => {}} phases={[<Text>hi</Text>, <Text>hi</Text>, <Text>hi</Text>]} />
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1
	},
	blurContainer: {
		padding: 20,
		borderRadius: 10,
		overflow: 'hidden'
	},
	sectionTitle: {
		color: 'white',
		fontFamily: 'SourceSemibold',
		fontSize: 20
	},
	titleContainer: {
		backgroundColor: '#544FB1',
		padding: 6,
		paddingHorizontal: 14,
		borderRadius: 5,
		marginTop: 15,
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8
	}
});

