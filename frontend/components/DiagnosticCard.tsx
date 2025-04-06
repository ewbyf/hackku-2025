import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
	name: string;
	doctor: string;
	date: string;
	progress: string;
}

const DiagnosisCard = ({ name, doctor, date, progress }: Props) => {
	const [info, setInfo] = useState(false);

	return (
		<View style={[styles.card, { opacity: progress == 'Completed' ? 0.35 : 1 }]}>
			{!info && (
				<>
					<TouchableOpacity onPress={() => setInfo(!info)} style={styles.infoIcon}>
						<Ionicons name="information-circle" size={24} color="black" />
					</TouchableOpacity>

					<View style={styles.row}>
						<View>
							<Text style={styles.title}>{name}</Text>
							<Text style={styles.subText}>{doctor}</Text>
						</View>
					</View>

					<View style={styles.footer}>
						<View>
							<Text style={styles.dateLabel}>{date}</Text>
						</View>
						<View style={styles.progressBlock}>
							<Text style={styles.progressText}>{progress}</Text>
							<Ionicons name="time-outline" size={16} color="black" />
						</View>
					</View>
				</>
			)}
			{info && (
				<>
					<TouchableOpacity onPress={() => setInfo(!info)} style={styles.infoIcon}>
						<Ionicons name="information-circle" size={24} color="black" />
					</TouchableOpacity>

					<View style={styles.row}>
						<View>
							<Text style={styles.title}>LMH Health</Text>
							<Text style={styles.subText}>325 Maine St, Lawrence, KS 66044</Text>
							<Text style={styles.subText}>(785) 505-5000</Text>
						</View>
					</View>

					<View style={styles.footer}>
						<View>
							<Text style={styles.dateLabel}>Room 241</Text>
						</View>
						<TouchableOpacity
							style={styles.uber}
							onPress={() => {
								const url = `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=38.960213&dropoff[longitude]=-95.277390&dropoff[nickname]=General%20Hospital&pickup=my_location`;
								Linking.openURL(url);
							}}
						>
							<Text style={[styles.progressText, { color: 'white', fontFamily: 'SourceSemibold' }]}>Book Uber</Text>
						</TouchableOpacity>
					</View>
				</>
			)}
		</View>
	);
};

export default DiagnosisCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		borderRadius: 16,
		padding: 20,
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 10,
		elevation: 4,
		marginBottom: 15,
		position: 'relative',
		marginRight: 20,
	},
	infoIcon: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	title: {
		fontSize: 22,
		fontFamily: 'SourceBold',
		color: '#6C63FF',
		paddingRight: 10,
	},
	subText: {
		fontSize: 18,
		color: 'black',
		marginTop: 2,
		fontFamily: 'Source',
	},
	footer: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	dateLabel: {
		fontSize: 18,
		fontFamily: 'SourceSemibold',
		color: '#666',
	},
	progressBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	progressText: {
		fontSize: 16,
		fontFamily: 'Source',
		color: '#000',
		marginRight: 5,
	},
	uber: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		backgroundColor: '#6C63FF',
		borderRadius: 12,
		padding: 8,
		paddingHorizontal: 20,
	},
});
