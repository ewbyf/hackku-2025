import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import CustomMedicationTimeline from '@/components/Timeline';
import TopBar from '@/components/TopBar';
import Title from '@/components/Title';

export default function History() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<TopBar />

			<CustomMedicationTimeline />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
	},
});
