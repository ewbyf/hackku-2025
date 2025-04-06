import { StyleSheet, View, Text } from 'react-native';
import First from './svgs/First';

const OnboardFirst = () => {
	return (
		<View style={styles.container}>
			<First />
			<View style={styles.textContainer}>
				<Text style={styles.title}>Never miss a dose again.</Text>
				<Text style={styles.desc}>
					Keep track of your prescriptions with smart reminders, dose tracking, and refill reminders — so you can focus on getting better.
				</Text>
			</View>
		</View>
	);
};

export default OnboardFirst;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		fontFamily: 'SourceBold',
		fontSize: 36,
		color: 'white',
	},
	desc: {
		fontFamily: 'SourceSemibold',
		fontSize: 20,
		color: 'white',
        lineHeight: 27
	},
    textContainer: {
        paddingHorizontal: 30,
        gap: 10,
        marginTop: 60,
    }
});
