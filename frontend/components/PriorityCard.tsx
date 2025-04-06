import { View, StyleSheet, Text } from 'react-native';

const PriorityCard = () => {
	return (
		<View style={styles.priorityCard}>
			<Text style={styles.priorityTitle}>IMPORTANT</Text>
            <Text style={styles.priorityTxt}>You have a doctor's appointment in <Text style={{fontFamily: "SourceBold"}}>4 days</Text>. All details are located in your journey.</Text>
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
		shadowColor: '#6C63FF',
        width: 300,
    },
	priorityTitle: {
        fontFamily: 'SourceBold',
		fontSize: 22,
    },
    priorityTxt: {
        fontFamily: 'Source',
		fontSize: 18,
    }
});
