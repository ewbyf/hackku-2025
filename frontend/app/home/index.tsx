import MedicineCard from '@/components/MedicineCard';
import Title from '@/components/Title';
import TopBar from '@/components/TopBar';
import { global } from '@/lib/context';
import { useRouter } from 'expo-router';
import { DateTime } from 'luxon';
import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import calendar from 'react-native-calendar-events';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Home() {
	const router = useRouter();
	const [hasEvent, setHasEvent] = useState(false);

	const { user } = useContext(global);

	useEffect(() => {
		(async () => {
			const events = await calendar.fetchAllEvents(DateTime.now().toISODate(), DateTime.now().plus({ days: 7 }).toISODate());

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
					<Title>Today</Title>
					<View style={{ gap: 20 }}>
						{user?.prescriptions.map((prescription) => (
							<MedicineCard key={prescription.medication} prescription={prescription} />
						))}
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
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
	}
});

