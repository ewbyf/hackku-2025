import { StyleSheet, View, Text } from 'react-native';
import Second from './svgs/Second';

const OnboardSecond = () => {
	return (
		<View style={styles.container}>
			<Second />
			<View style={styles.textContainer}>
				<Text style={styles.title}>Summarized, Spoken, Simple.</Text>
				<Text style={styles.desc}>
                Your medical records, automatically summarized and spoken aloud — no more deciphering complex reports.
				</Text>
			</View>
		</View>
	);
};

export default OnboardSecond;

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
