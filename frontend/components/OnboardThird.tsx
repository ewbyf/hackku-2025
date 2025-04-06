import { StyleSheet, View, Text } from 'react-native';
import Third from './svgs/Third';

const OnboardThird = () => {
	return (
		<View style={styles.container}>
			<Third />
			<View style={styles.textContainer}>
				<Text style={styles.title}>Health Journey Made Simple.</Text>
				<Text style={styles.desc}>
                See everything in one place — from past labs to future appointments — with reminders that stay smart when you're on the go.
				</Text>
			</View>
		</View>
	);
};

export default OnboardThird;

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
