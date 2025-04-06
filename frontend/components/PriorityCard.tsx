import { View, StyleSheet, Text } from 'react-native';

const PriorityCard = () => {
	return (
		<View style={styles.priorityCard}>
			<Text style={styles.priorityTitle}>Reminder</Text>
            <Text>You have a doctor's appointment in 4 days.</Text>
		</View>
	);
};

export default PriorityCard;

const styles = StyleSheet.create({
	priorityCard: {
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
	priorityTitle: {
        fontFamily: 'SourceSemibold',
		fontSize: 20,
		lineHeight: 20
    },
});
