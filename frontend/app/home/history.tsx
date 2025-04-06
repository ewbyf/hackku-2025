import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button, ImageBackground } from 'react-native';
import CustomMedicationTimeline from '@/components/Timeline';
import TopBar from '@/components/TopBar';
import Title from '@/components/Title';

export default function History() {
	const router = useRouter();

	return (
		<ImageBackground source={require('../../assets/images/bg.png')} imageStyle={{ resizeMode: 'cover' }} style={{ height: '100%', width: '100%' }}>
			<SafeAreaView style={styles.container}>
				<TopBar />
				<CustomMedicationTimeline />
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
	},
});
