import CustomMedicationTimeline from '@/components/HistoryCard';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function History() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, padding: 20 }}>
				<CustomMedicationTimeline />
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1
	}
});

