import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import CustomMedicationTimeline from '@/components/Timeline';
import TopBar from '@/components/TopBar';

export default function History() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<TopBar />

			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, padding: 20 }}>
				<CustomMedicationTimeline />
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
	},
});
