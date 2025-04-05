import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';

interface Props {
	name: string;
	description: string;
	takeDuring: string;
	interval: string;
	timestamp: Date;
	type: string;
}

const MedicineCard = ({ name, description, takeDuring, interval, timestamp }: Props) => {
	return (
		<TouchableOpacity style={styles.container}>
			<View style={{ justifyContent: 'space-between' }}>
				<View>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.description}>{description}</Text>
				</View>
				<View>
					<Text style={styles.take}>TAKE DURING</Text>
					<View style={{ flexDirection: 'row', gap: 5 }}>{/* icons here */}</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default MedicineCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 5,
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 15,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
	},
	name: {
		fontFamily: 'SourceSemi',
		fontSize: 20,
	},
	description: {
		fontFamily: 'Source',
		fontSize: 10,
	},
	take: {
		fontFamily: 'SourceBold',
		fontSize: 10,
		color: '#787878',
	},
});
