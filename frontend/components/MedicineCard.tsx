import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import Sun from 'react-native-vector-icons/Ionicons';
import Fork from 'react-native-vector-icons/Ionicons';
import Moon from 'react-native-vector-icons/Ionicons';
import { Prescription } from '@/interfaces/Prescription';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
	name: string;
	description: string;
	takeDuring: string;
	interval: string;
	timestamp: Date;
	type: string;
}

const MedicineCard = ({ name, description, takeDuring, interval, timestamp }: Props) => {
    const takeMed = () => {

    }

	return (
		<TouchableOpacity style={styles.container}>
			<View style={{ justifyContent: 'space-between', gap: 10 }}>
				<View>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.description}>{description}</Text>
				</View>
				<View style={{gap: 3}}>
					<Text style={styles.take}>TAKE DURING</Text>
					<View style={{ flexDirection: 'row', gap: 5 }}>
						<Sun name="sunny" color={'white'} size={32} style={takeDuring === 'morning' ? styles.sunActive : styles.emojiInactive}></Sun>
						<Fork name="restaurant" color={'yellow'} size={32} style={takeDuring === 'meal' ? styles.mealActive : styles.emojiInactive}></Fork>
						<Moon name="moon" color={'white'} size={32} style={takeDuring === 'Night' ? styles.moonActive : styles.emojiInactive}></Moon>
					</View>
				</View>
			</View>
			<View style={{ justifyContent: 'space-between', gap: 10 }}>
				<Text style={styles.interval}>Every 4 hours</Text>
				<TouchableOpacity style={styles.btn} onPress={takeMed}>
					<Text style={styles.btnText}>I've taken it</Text>
					<View style={styles.circle}></View>
					{/* <Icon name="checkmark" size={32} style={{ position: 'absolute', right: 8, borderColor: 'black' }} color={'#3BC23B'}></Icon> */}
				</TouchableOpacity>
				<View style={{ flexDirection: 'row', gap: 3, alignItems: 'center', alignSelf: 'flex-end' }}>
					<Text style={styles.status}>Ready to be taken</Text>
					<Icon name="checkmark" size={16} color={'#3BC23B'}></Icon>
				</View>
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
		paddingVertical: 10,
		backgroundColor: 'white',
		borderRadius: 15,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
	},
	name: {
		fontFamily: 'SourceSemibold',
		fontSize: 26,
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
		gap: 15,
	},
	btnText: {
		color: 'white',
		fontFamily: 'SourceSemibold',
		fontSize: 20,
	},
	status: {
		fontFamily: 'SourceSemibold',
		fontSize: 16,
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
