import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button, ImageBackground } from 'react-native';
import TopBar from '@/components/TopBar';
import Title from '@/components/Title';
import MedicineCard from '@/components/MedicineCard';
import React from 'react';
import BGSvg from '@/components/svgs/BG';
import { BlurView } from 'expo-blur';

export default function Home() {
	const router = useRouter();

	return (
		<>
			<ImageBackground source={require('../../assets/images/bg.png')} imageStyle={{ resizeMode: 'cover' }} style={{ height: '100%', width: '100%' }}>
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
			</ImageBackground>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
	},
	blurContainer: {
		padding: 20,
		borderRadius: 10,
		overflow: 'hidden',
	},
});
