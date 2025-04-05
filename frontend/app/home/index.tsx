import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import TopBar from '@/components/TopBar';
import Title from '@/components/Title';
import MedicineCard from '@/components/MedicineCard';

export default function Home() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<TopBar />
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, padding: 20 }}>
				<Title>Today</Title>
				<MedicineCard
					name="Drug name"
					description="blah blah blah..."
					takeDuring="Night"
					timestamp={new Date()}
					interval="Every 4 days"
					type="Liquid"
				/>
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
