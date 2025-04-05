import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import Sun from 'react-native-vector-icons/Ionicons';
import Fork from 'react-native-vector-icons/Ionicons';
import Moon from 'react-native-vector-icons/Ionicons';

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
                    <Text>Take During</Text>
					<View style={{ flexDirection: 'row', gap: 5 }}>
                        <Sun name="sunny" color={'white'} size={36} style={takeDuring === 'morning' ? styles.sunActive : styles.emojiInactive}></Sun>
                        <Fork name="restaurant" color={'yellow'} size={36} style={takeDuring === 'meal' ? styles.mealActive : styles.emojiInactive}></Fork>
                        <Moon name="moon" color={'white'} size={36} style={takeDuring === 'Night' ? styles.moonActive : styles.emojiInactive}></Moon>
                    </View>
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
    sunActive: {
        color: '#FFB94F',
        fontSize: 20,
    },
    mealActive: {
        color: '#8F9EB5',
        fontSize: 20,
    },
    moonActive: {
        color: '#3867CC',
        fontSize: 20,
    },
    emojiInactive: {
        color: '#CDCDCD',
        fontSize: 20,
    },
});
