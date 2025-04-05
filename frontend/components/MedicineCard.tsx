import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import Sun from 'react-native-vector-icons/Ionicons';
import Fork from 'react-native-vector-icons/Ionicons';
import Moon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Prescription } from '@/lib/context';
import React, { useContext, useEffect, useState } from 'react';
import api from '@/lib/axiosConfig';
import { global } from '@/lib/context';

const MedicineCard = ({ prescription }: { prescription: Prescription }) => {
	const { updateUser } = useContext(global);
	const [time, setTime] = useState(0);

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
			prescriptionId: prescription.id,
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
		<TouchableOpacity style={styles.container}>
			<View style={{ justifyContent: 'space-between', gap: 0 }}>
				<View>
					<Text style={styles.name} numberOfLines={2}>
						{prescription.medication}
					</Text>
					{/* <Text style={styles.description}>{prescription.de}</Text> */}
				</View>
				<View style={{ gap: 3 }}>
					<Text style={styles.take}>TAKE DURING</Text>
					<View style={{ flexDirection: 'row', gap: 8 }}>
						<Sun
							name="sunny"
							color={'white'}
							size={28}
							style={prescription.medication === 'morning' ? styles.sunActive : styles.emojiInactive}
						></Sun>
						<Fork
							name="restaurant"
							color={'yellow'}
							size={28}
							style={prescription.medication === 'meal' ? styles.mealActive : styles.emojiInactive}
						></Fork>
						<Moon
							name="moon"
							color={'white'}
							size={28}
							style={prescription.medication === 'night' ? styles.moonActive : styles.emojiInactive}
						></Moon>
					</View>
				</View>
				<Text style={[styles.interval, { alignSelf: 'flex-start' }]}>{prescription.freq} dose(s) left</Text>
			</View>
			<View style={{ justifyContent: 'space-between', gap: 10 }}>
				<Text style={styles.interval}>
					Every {prescription.period} {prescription.periodUnit === 'h' ? 'hour(s)' : 'day(s)'}
				</Text>
				{prescription.lastTaken === null ||
				Date.now() - new Date(prescription.lastTaken).valueOf() >=
					prescription.period * ((prescription.periodUnit == 'h' ? 3600 : (3600 * 24) / prescription.freq) * 1000) ? (
					<>
						<TouchableOpacity style={styles.btn} onPress={takeMed}>
							<Text style={styles.btnText}>I Took It 💊</Text>
							{/* <View style={styles.circle}></View> */}
							{/* <Icon name="checkmark" size={32} style={{ position: 'absolute', right: 8, borderColor: 'black' }} color={'#3BC23B'}></Icon> */}
						</TouchableOpacity>
						<View style={styles.statusContainer}>
							<Text style={styles.status}>READY</Text>
							<Icon name="checkmark" size={16} color={'green'}></Icon>
						</View>
					</>
				) : (
					<>
						<TouchableOpacity style={styles.btn} onPress={takeMed}>
							<Text style={styles.btnText}>
								{Math.floor((time / 3600) % 60) > 0 ? `${String(Math.floor((time / 3600) % 60)).padStart(1, '0')}:` : ''}
								{String(Math.floor((time / 60) % 60)).padStart(1, '0')}:{String(time % 60).padStart(2, '0')}
							</Text>
							{/* <Icon name="checkmark" size={32} style={{ position: 'absolute', right: 8, borderColor: 'black' }} color={'#3BC23B'}></Icon> */}
						</TouchableOpacity>
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
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		height: 150,
	},
	name: {
		fontFamily: 'SourceSemibold',
		fontSize: 20,
		maxWidth: 180,
        lineHeight: 20
	},
	description: {
		fontFamily: 'Source',
		fontSize: 16,
	},
	take: {
		fontFamily: 'SourceBold',
		fontSize: 16,
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
		paddingHorizontal: 12,
		paddingVertical: 2,
		borderRadius: 10,
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
		paddingHorizontal: 12,
		paddingVertical: 2,
		borderRadius: 10,
	},
	status: {
		fontFamily: 'SourceSemibold',
		fontSize: 14,
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
