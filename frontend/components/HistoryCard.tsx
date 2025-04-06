import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Props {
	name: string;
	description: string;
	takeDuring: string;
	interval: string;
	timestamp: Date;
	type: string;
}

const medicationHistory = [
	{
		date: 'Apr 5',
		meds: [
			{
				name: 'Paracetamol',
				desc: '500mg taken after breakfast for headache'
			},
			{
				name: 'Ibuprofen',
				desc: '200mg taken after lunch for inflammation'
			}
		]
	},
	{
		date: 'Apr 4',
		meds: [
			{
				name: 'Vitamin C',
				desc: '1 tablet taken with water to boost immunity'
			},
			{
				name: 'Melatonin',
				desc: '3mg taken before bed for sleep support'
			}
		]
	}
];

const CustomMedicationTimeline = () => {
	return (
		<FlatList
			data={medicationHistory}
			keyExtractor={(item) => item.date}
			contentContainerStyle={styles.container}
			renderItem={({ item }) => (
				<View style={styles.timelineBlock}>
					{item.meds.map((med, idx) => (
						<View key={idx} style={styles.cardRow}>
							{/* Dot + Line Wrapper */}
							<View style={styles.timelineWrapper}>
								{/* Vertical Line */}
								<View style={styles.verticalLine} />
								{/* Dot */}
								<View style={styles.dot} />
							</View>

							{/* Card Content */}
							<View style={styles.card}>
								{idx === 0 && <Text style={styles.dateText}>{item.date}</Text>}
								<Text style={styles.name}>{med.name}</Text>
								<Text style={styles.desc}>{med.desc}</Text>
							</View>
						</View>
					))}
				</View>
			)}
		/>
	);
};

export default CustomMedicationTimeline;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#FAFAFA'
	},
	timelineBlock: {
		paddingLeft: 30
	},
	cardRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 25
	},
	timelineWrapper: {
		width: 20,
		alignItems: 'center',
		position: 'relative'
	},
	verticalLine: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: 2,
		backgroundColor: '#E1DAFF',
		zIndex: -1
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#9D8FFF',
		marginTop: 4
	},
	card: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 12,
		padding: 15,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		elevation: 2
	},
	dateText: {
		fontSize: 12,
		color: '#9D8FFF',
		fontWeight: 'bold',
		marginBottom: 6
	},
	name: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333'
	},
	desc: {
		fontSize: 14,
		color: '#666',
		marginTop: 4
	}
});
