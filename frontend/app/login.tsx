import BackArrow from '@/components/BackArrow';
import { login } from '@/lib/auth';
import api from '@/lib/axiosConfig';
import { Link, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { global } from '@/lib/context';
import SignIn from '@/components/svgs/SignIn';
import React from 'react';

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { updateUser } = useContext(global);

	const handleLogin = async () => {
		api.post('/login', {
			email,
			password,
		})
			.then((res) => {
				const data = res.data;

				login(data.token);
				updateUser();
				router.replace('/home');
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};

	return (
		<>
			<BackArrow />

			<View style={styles.container}>
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, padding: 30 }}>
					{' '}
					<SignIn style={{ position: 'absolute', zIndex: 10 }} height={375} />
					<View style={{ gap: 20, justifyContent: 'flex-end', height: '100%' }}>
						<Text style={styles.title}>Let's get you signed in</Text>
						<View style={{ gap: 20 }}>
							<View style={{ gap: 5 }}>
								<Text style={styles.label}>EMAIL ADDRESS</Text>
								<TextInput
									style={[styles.input]}
									placeholder="Enter your email address..."
									placeholderTextColor={'white'}
									onChangeText={(e) => {
										setEmail(e);
									}}
									value={email}
								></TextInput>
							</View>
							<View style={{ gap: 5 }}>
								<Text style={styles.label}>PASSWORD</Text>
								<TextInput
									style={[styles.input]}
									placeholder="Enter your password..."
									placeholderTextColor={'white'}
									onChangeText={(e) => {
										setPassword(e);
									}}
									value={password}
									secureTextEntry={true}
								></TextInput>
							</View>
							<TouchableOpacity style={styles.btn} onPress={handleLogin}>
								<Text style={styles.btnText}>Sign in</Text>
							</TouchableOpacity>
							<Text style={styles.swapLabel}>
								Don't have an account?{' '}
								<Link style={{ color: 'white', textDecorationLine: 'underline', fontFamily: 'SourceBold' }} href="/signup">
									Sign up
								</Link>
							</Text>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		backgroundColor: '#6C63FF',
		paddingBottom: 30,
	},
	title: {
		fontFamily: 'SourceBold',
		color: 'white',
		fontSize: 48,
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
		marginTop: 10,
	},
	btnText: {
		color: '#6C63FF',
		fontFamily: 'SourceSemibold',
		fontSize: 22,
	},
	input: {
		borderRadius: 10,
		fontSize: 16,
		padding: 15,
		color: 'white',
		backgroundColor: '#918AFF',
	},
	label: {
		color: 'white',
		fontFamily: 'SourceBold',
		fontSize: 14,
	},
	swapLabel: {
		color: 'white',
		fontFamily: 'Source',
		fontSize: 15,
		textAlign: 'center',
	},
});
