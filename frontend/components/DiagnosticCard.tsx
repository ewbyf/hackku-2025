import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
	name: string;
	doctor: string;
	date: string;
	progress: string;
	onPressInfo?: () => void;
}

const DiagnosisCard = ({ name, doctor, date, progress, onPressInfo }: Props) => {
	return (
		<View style={styles.card}>
			<TouchableOpacity onPress={onPressInfo} style={styles.infoIcon}>
				<Ionicons name="information-circle" size={20} color="black" />
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
					<Text style={styles.subText}>mm/dd/yyyy</Text>
				</View>
				<View style={styles.progressBlock}>
					<Text style={styles.progressText}>{progress}</Text>
					<Ionicons name="time-outline" size={16} color="black" />
				</View>
			</View>
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
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000',
	},
	subText: {
		fontSize: 14,
		color: '#666',
		marginTop: 2,
	},
	footer: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	dateLabel: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#888',
	},
	progressBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	progressText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#000',
		marginRight: 5,
	},
});
