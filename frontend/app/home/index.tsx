import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button, ImageBackground } from 'react-native';
import TopBar from '@/components/TopBar';
import Title from '@/components/Title';
import MedicineCard from '@/components/MedicineCard';
import React, { useContext } from 'react';
import BGSvg from '@/components/svgs/BG';
import { BlurView } from 'expo-blur';
import { global } from '@/lib/context';

export default function Home() {
	const router = useRouter();

	const { user } = useContext(global);

	return (
		<>
			<ImageBackground source={require('../../assets/images/bg.png')} imageStyle={{ resizeMode: 'cover' }} style={{ height: '100%', width: '100%' }}>
				<SafeAreaView style={styles.container}>
					<TopBar />
					<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
						<Title>Today</Title>
                        <View style={{gap: 20}}>

						{user?.prescriptions.map((prescription) => (
                            <MedicineCard key={prescription.medication} prescription={prescription} />
						))}
                        </View>
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
