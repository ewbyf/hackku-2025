import { TutorialPhaseProps } from '@/app/tutorial';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MedicineCard from '../MedicineCard';
import Title from '../Title';
import TopBar from '../TopBar';
import Checkmark from '../svgs/Checkmark';

const Phase1: React.FC<TutorialPhaseProps> = ({ next }) => {
	return (
		<ImageBackground source={require('../../assets/images/bg.png')} imageStyle={{ resizeMode: 'cover' }} style={{ height: '100%', width: '100%' }}>
			<SafeAreaView style={styles.container}>
				<TopBar />
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
					<Title>Today's Meds</Title>
					<View style={{ gap: 10 }}>
						<View style={styles.titleContainer}>
							<Checkmark color="white" />
							<Text style={styles.sectionTitle}>Ready to Take</Text>
						</View>
						<View style={{ gap: 20, marginBottom: 20 }}>
							<TouchableWithoutFeedback style={{ zIndex: 2, position: 'relative' }}>
								<MedicineCard
									inspect={next}
									prescription={{
										id: '',
										userId: '',
										dosage: 1,
										freq: 1,
										medication: 'Tylenol',
										vector: 'tablet',
										period: 1,
										periodUnit: 'd',
										takenToday: 0,
										lastTaken: null
									}}
								/>
							</TouchableWithoutFeedback>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
			<View
				style={{
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 1,
					backgroundColor: 'rgba(0, 0, 0, 0.6)'
				}}
			/>
		</ImageBackground>
	);
};

export default Phase1;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		position: 'relative',
		zIndex: 0,
		height: '100%',
		width: '100%'
	},
	blurContainer: {
		padding: 20,
		borderRadius: 10,
		overflow: 'hidden'
	},
	sectionTitle: {
		color: 'white',
		fontFamily: 'SourceSemibold',
		fontSize: 20
	},
	titleContainer: {
		backgroundColor: '#544FB1',
		padding: 6,
		paddingHorizontal: 14,
		borderRadius: 5,
		marginTop: 15,
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8
	}
});

