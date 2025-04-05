import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { isLoggedIn } from '../lib/auth';
import { useEffect } from 'react';
import HomeLogo from '@/components/svgs/HomeLogo';

export default function Landing() {
	const router = useRouter();

	useEffect(() => {
		const check = async () => {
			const loggedIn = await isLoggedIn();
			if (loggedIn) {
				router.replace('/home');
			}
		};

		check();
	}, []);

	return (
   
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, padding: 30 }}>
				<View style={{ gap: 50, justifyContent: 'flex-end', height: '100%' }}>
					<View style={{ gap: 5, alignItems: 'center' }}>
                    <HomeLogo></HomeLogo>
						<Text style={styles.title}>ClearHelp</Text>
						<Text style={styles.description}>All the help you need is just one tap away</Text>
					</View>
					<View style={{gap: 15}}>
						<TouchableOpacity style={styles.btn} onPress={() => router.navigate('/login')}>
							<Text style={styles.btnText}>I have an account</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.btn, { backgroundColor: '#918AFF' }]} onPress={() => router.navigate('/signup')}>
							<Text style={[styles.btnText, { color: 'white' }]}>I don't have an account</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		backgroundColor: '#6C63FF',
	},
	title: {
		fontFamily: 'SourceBold',
		color: 'white',
		fontSize: 64,
	},
	description: {
		fontFamily: 'Source',
		color: 'white',
		fontSize: 24,
		textAlign: 'center',
	},
	btn: {
		backgroundColor: 'white',
		width: '100%',
		paddingVertical: 15,
		alignItems: 'center',
		borderRadius: 15,
        shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
	},
	btnText: {
		color: '#6C63FF',
		fontFamily: 'SourceSemibold',
		fontSize: 22,
	},
});
