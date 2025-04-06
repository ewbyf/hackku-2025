import { Stack, useLocalSearchParams } from 'expo-router';
import { global, Prescription } from '@/lib/context';
import MedicineCard from '@/components/MedicineCard';
import Title from '@/components/Title';
import TopBar from '@/components/TopBar';
import { useRouter } from 'expo-router';
import { DateTime } from 'luxon';
import { ImageBackground, SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ReactNativeCalendarEvents from 'react-native-calendar-events';
import calendar from 'react-native-calendar-events';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Checkmark from '@/components/svgs/Checkmark';
import Clock from '@/components/svgs/Clock';
import { useState, useEffect, useContext } from 'react';
import BackArrow from '@/components/BackArrow';
import Sun from 'react-native-vector-icons/Ionicons';
import Fork from 'react-native-vector-icons/Ionicons';
import Moon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '@/lib/axiosConfig';

export default function ExtraScreen() {
	const [prescription, setPrescription] = useState<Prescription>();
	const [time, setTime] = useState(0);

	const router = useRouter();
	const { id } = useLocalSearchParams();
	const { user, updateUser } = useContext(global);

	useEffect(() => {
		const arr = [...user!.prescriptions[0], ...user!.prescriptions[1], ...user!.prescriptions[2]];
		setPrescription(arr.find((pre) => pre.id == id));
	}, [user]);

	useEffect(() => {
		if (prescription?.lastTaken == null) return;

		const msPerUnit = prescription.periodUnit === 'h' ? 3600 * 1000 : (24 * 3600 * 1000) / prescription.freq;
		const totalDurationMs = prescription.period * msPerUnit;
		const timeElapsed = Date.now() - new Date(prescription.lastTaken).valueOf();
		const initialSeconds = Math.ceil((totalDurationMs - timeElapsed) / 1000);

		setTime(initialSeconds);

		const interval = setInterval(() => {
			setTime((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [prescription]);

	const takeMed = () => {
		api.post('/take', {
			prescriptionId: prescription?.id,
		})
			.then((resp) => {
				console.log(resp);
				updateUser();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (!prescription) {
		return null;
	}

	return (
		<ImageBackground source={require('../assets/images/bg.png')} imageStyle={{ resizeMode: 'cover' }} style={{ height: '100%', width: '100%' }}>
			<SafeAreaView style={styles.container}>
				<BackArrow />
				<TopBar logo={false} />
				<KeyboardAwareScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ padding: 20, paddingBottom: 40, justifyContent: 'space-between', height: '100%' }}
				>
					<View style={{gap: 10}}>
						<Title noUnderline={true}>{prescription?.medication}</Title>

						<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
							<Text style={[styles.interval, { alignSelf: 'flex-start', backgroundColor: '#FFE0FD', color: '#E732FF' }]}>
								Every {prescription.period} {prescription.periodUnit === 'h' ? 'hour(s)' : 'day(s)'}
							</Text>
							<Text style={[styles.interval, { alignSelf: 'flex-start' }]}>
								{prescription.freq - prescription.takenToday}/{prescription.freq} dose(s) left to take
							</Text>
							<Text style={[styles.interval, { alignSelf: 'flex-start', backgroundColor: '#FFF3A3', color: '#F99500' }]}>
								{prescription.dosage}x dose
							</Text>
							{prescription?.timing?.toLowerCase() !== 'before bed' && (
								<Text style={[styles.interval, { alignSelf: 'flex-start', backgroundColor: '#CDD9F2', color: '#3867CC' }]}>
									Take before bed
								</Text>
							)}
						</View>

						<Text style={styles.description}>description</Text>
					</View>

					<View style={{ gap: 10 }}>
						<View style={{ justifyContent: 'space-between', gap: 10 }}>
							{prescription.freq - prescription.takenToday == 0 ? (
								<View style={[styles.statusContainer, { backgroundColor: '#FFF3A3', }]}>
									<Text style={[styles.status, { color: '#F99500', }]}>DONE FOR TODAY</Text>
									<Icon name="happy-outline" size={18} color={'#F99500'}></Icon>
								</View>
							) : prescription.lastTaken === null ||
							  Date.now() - new Date(prescription.lastTaken).valueOf() >=
									prescription.period * ((prescription.periodUnit == 'h' ? 3600 : (3600 * 24) / prescription.freq) * 1000) ? (
								<View style={styles.statusContainer}>
									<Text style={styles.status}>READY</Text>
									<Icon name="checkmark" size={18} color={'green'}></Icon>
								</View>
							) : (
								<View style={[styles.statusContainer, { backgroundColor: '#FFCCCC' }]}>
									<Text style={[styles.status, { color: 'red' }]}>NOT READY</Text>
									<Icon name="close" size={18} color={'red'}></Icon>
								</View>
							)}
						</View>

						<View style={{ justifyContent: 'space-between', gap: 10,}}>
							{prescription.freq - prescription.takenToday == 0 ? (
								<TouchableOpacity style={[styles.btn, {opacity: .5}]} onPress={takeMed} disabled >
									{prescription.freq - prescription.takenToday == 0 && <Text style={styles.btnText}>I took it</Text>}
								</TouchableOpacity>
							) : prescription.lastTaken === null ||
							  Date.now() - new Date(prescription.lastTaken).valueOf() >=
									prescription.period * ((prescription.periodUnit == 'h' ? 3600 : (3600 * 24) / prescription.freq) * 1000) ? (
								<TouchableOpacity style={styles.btn} onPress={takeMed} disabled={prescription.freq - prescription.takenToday == 0}>
									<Text style={styles.btnText}>I took it</Text>
								</TouchableOpacity>
							) : (
								<View style={[styles.btn, { shadowColor: 'rgba(0,0,0,0)', backgroundColor: '#6C63FF', opacity: 0.8 }]}>
									<Text style={styles.btnText}>
										{Math.floor((time / 3600) % 60) > 0 ? `${String(Math.floor((time / 3600) % 60)).padStart(1, '0')}:` : ''}
										{String(Math.floor((time / 60) % 60)).padStart(2, '0')}:{String(time % 60).padStart(2, '0')}
									</Text>
								</View>
							)}
						</View>
					</View>
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
	title: {
		fontSize: 34,
		fontFamily: 'SourceBold',
	},
	description: {
		fontFamily: 'Source',
		fontSize: 20,
	},
	take: {
		fontFamily: 'SourceBold',
		fontSize: 20,
		color: '#787878',
	},
	sunActive: {
		color: '#FFB94F',
	},
	mealActive: {
		color: '#8F9EB5',
	},
	moonActive: {
		color: '#3867CC',
	},
	emojiInactive: {
		color: '#CDCDCD',
	},
	interval: {
		fontFamily: 'SourceSemibold',
		color: '#6C63FF',
		backgroundColor: '#E2E0FF',
		paddingHorizontal: 16,
		paddingVertical: 5,
		borderRadius: 10,
		fontSize: 16,
		alignSelf: 'flex-end',
	},
	btn: {
		backgroundColor: '#6C63FF',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		justifyContent: 'center',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
	},
	btnText: {
		color: 'white',
		fontFamily: 'SourceSemibold',
		fontSize: 20,
	},
	statusContainer: {
		flexDirection: 'row',
		gap: 3,
		alignItems: 'center',
		alignSelf: 'flex-end',
		backgroundColor: 'lightgreen',
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 10,
	},
	status: {
		fontFamily: 'SourceSemibold',
		fontSize: 18,
		color: 'green',
	},
	circle: {
		borderRadius: '100%',
		backgroundColor: 'white',
		height: 17,
		width: 17,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'visible',
	},
});
