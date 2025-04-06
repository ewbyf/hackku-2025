import api from '@/lib/axiosConfig';
import { global, Prescription } from '@/lib/context';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MedicineCard = ({ prescription, inspect }: { prescription: Prescription; inspect?: () => void }) => {
	const { updateUser } = useContext(global);
	const [time, setTime] = useState(0);

	const router = useRouter();

	useEffect(() => {
		if (prescription.lastTaken == null) return;

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

		// Cleanup on unmount or prescription change
		return () => clearInterval(interval);
	}, [prescription]);

	const takeMed = () => {
		api.post('/take', {
			prescriptionId: prescription.id
		})
			.then((resp) => {
				console.log(resp);
				updateUser();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<TouchableOpacity
			style={[styles.container, { opacity: prescription.freq - prescription.takenToday == 0 ? 0.5 : 1 }]}
			onPress={() =>
				inspect ??
				router.push({
					pathname: '/drug',
					params: {
						id: prescription.id
					}
				})
			}>
			<View style={{ justifyContent: 'space-between', gap: 5 }}>
				<View>
					<Text style={styles.name} numberOfLines={2}>
						{prescription.medication}
					</Text>
					{/* <Text style={styles.description}>{prescription.de}</Text> */}
				</View>
				{/* <View style={{ gap: 3 }}>
					<Text style={styles.take}>TAKE DURING</Text>
					<View style={{ flexDirection: 'row', gap: 8 }}>
						<Sun
							name="sunny"
							color={'white'}
							size={28}
							style={prescription.timing?.toLowerCase() === 'morning' ? styles.sunActive : styles.emojiInactive}
						></Sun>
						<Fork
							name="restaurant"
							color={'yellow'}
							size={28}
							style={prescription.timing?.toLowerCase() === 'meal' ? styles.mealActive : styles.emojiInactive}
						></Fork>
						<Moon
							name="moon"
							color={'white'}
							size={28}
							style={prescription.timing?.toLowerCase() === 'before bed' ? styles.moonActive : styles.emojiInactive}
						></Moon>
					</View>
				</View> */}
				<Text style={[styles.interval, { alignSelf: 'flex-start', backgroundColor: '#FFE0FD', color: '#E732FF' }]}>
					Every {prescription.period} {prescription.periodUnit === 'h' ? 'hour(s)' : 'day(s)'}
				</Text>
				<Text style={[styles.interval, { alignSelf: 'flex-start' }]}>
					{prescription.freq - prescription.takenToday}/{prescription.freq} dose(s) left to take
				</Text>
			</View>
			<View style={{ justifyContent: 'space-between', gap: 10 }}>
				{/* <Text style={styles.interval}>
					Every {prescription.period} {prescription.periodUnit === 'h' ? 'hour(s)' : 'day(s)'}
				</Text> */}
				{prescription.freq - prescription.takenToday == 0 ? (
					<>
						<TouchableOpacity style={styles.btn} onPress={takeMed} disabled={prescription.freq - prescription.takenToday == 0}>
							{prescription.freq - prescription.takenToday == 0 && <Text style={styles.btnText}>Done</Text>}
						</TouchableOpacity>
						<View style={[styles.statusContainer, { backgroundColor: '#FFF8C9' }]}>
							<Text style={[styles.status, { color: '#F9AE00' }]}>DONE FOR TODAY</Text>
							<Icon name="happy-outline" size={16} color={'#F9AE00'}></Icon>
						</View>
					</>
				) : prescription.lastTaken === null ||
				  Date.now() - new Date(prescription.lastTaken).valueOf() >=
						prescription.period * ((prescription.periodUnit == 'h' ? 3600 : (3600 * 24) / prescription.freq) * 1000) ? (
					<>
						<TouchableOpacity style={styles.btn} onPress={takeMed} disabled={prescription.freq - prescription.takenToday == 0}>
							<Text style={styles.btnText}>I took it</Text>
						</TouchableOpacity>
						<View style={styles.statusContainer}>
							<Text style={styles.status}>READY</Text>
							<Icon name="checkmark" size={16} color={'green'}></Icon>
						</View>
					</>
				) : (
					<>
						<View style={[styles.btn, { shadowColor: 'rgba(0,0,0,0)', backgroundColor: '#6C63FF', opacity: 0.8 }]}>
							<Text style={styles.btnText}>
								{Math.floor((time / 3600) % 60) > 0 ? `${String(Math.floor((time / 3600) % 60)).padStart(1, '0')}:` : ''}
								{String(Math.floor((time / 60) % 60)).padStart(2, '0')}:{String(time % 60).padStart(2, '0')}
							</Text>
							{/* <Icon name="checkmark" size={32} style={{ position: 'absolute', right: 8, borderColor: 'black' }} color={'#3BC23B'}></Icon> */}
						</View>
						<View style={[styles.statusContainer, { backgroundColor: '#FFCCCC' }]}>
							<Text style={[styles.status, { color: 'red' }]}>NOT READY</Text>
							<Icon name="close" size={16} color={'red'}></Icon>
						</View>
					</>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default MedicineCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 5,
		paddingHorizontal: 15,
		paddingVertical: 12,
		backgroundColor: 'white',
		borderRadius: 15,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 5,
		shadowOpacity: 0.25,
		shadowColor: '#6C63FF'
	},
	name: {
		fontFamily: 'SourceSemibold',
		fontSize: 20,
		maxWidth: 180,
		lineHeight: 20
	},
	description: {
		fontFamily: 'Source',
		fontSize: 16
	},
	take: {
		fontFamily: 'SourceBold',
		fontSize: 16,
		color: '#787878'
	},
	sunActive: {
		color: '#FFB94F'
	},
	mealActive: {
		color: '#8F9EB5'
	},
	moonActive: {
		color: '#3867CC'
	},
	emojiInactive: {
		color: '#CDCDCD'
	},
	interval: {
		fontFamily: 'SourceSemibold',
		color: '#6C63FF',
		backgroundColor: '#E2E0FF',
		paddingHorizontal: 12,
		paddingVertical: 2,
		borderRadius: 10,
		alignSelf: 'flex-end'
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
		shadowOpacity: 0.25
	},
	btnText: {
		color: 'white',
		fontFamily: 'SourceSemibold',
		fontSize: 20
	},
	statusContainer: {
		flexDirection: 'row',
		gap: 3,
		alignItems: 'center',
		alignSelf: 'flex-end',
		backgroundColor: 'lightgreen',
		paddingHorizontal: 12,
		paddingVertical: 2,
		borderRadius: 10
	},
	status: {
		fontFamily: 'SourceSemibold',
		fontSize: 14,
		color: 'green'
	},
	circle: {
		borderRadius: '100%',
		backgroundColor: 'white',
		height: 17,
		width: 17,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'visible'
	}
});

