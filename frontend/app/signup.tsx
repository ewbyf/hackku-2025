import { Link, useRouter } from 'expo-router';
import { login } from '../lib/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import { useState, useContext } from 'react';
import BackArrow from '@/components/BackArrow';
import api from '@/lib/axiosConfig';
import { global } from '@/lib/context';
import SignUpSvg from '@/components/svgs/SignUpSvg';
import React from 'react';

export default function SignUp() {
	const router = useRouter();
	// const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { updateUser } = useContext(global);

	const handleSignUp = async () => {
		if (password == confirmPassword) {
			api.post('/register', {
				// name,
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
					console.log(err);
				});
		}
	};

	return (
		<>
			<BackArrow />
			<SignUpSvg style={{ position: 'absolute', zIndex: 1 }} height={275} />
			<SafeAreaView style={styles.container}>
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, padding: 30 }}>
					<View style={{ gap: 20, justifyContent: 'flex-end', height: '100%' }}>
						<Text style={styles.title}>Let's create an account</Text>
						<View style={{ gap: 20 }}>
							{/* <View style={{ gap: 5 }}>
							<Text style={styles.label}>NAME</Text>
							<TextInput
								style={[styles.input]}
								placeholder="Enter your name..."
								placeholderTextColor={'white'}
								onChangeText={(e) => {
									setName(e);
								}}
								value={name}
							></TextInput>
						</View> */}
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
							<View style={{ gap: 5 }}>
								<Text style={styles.label}>CONFIRM PASSWORD</Text>
								<TextInput
									style={[styles.input]}
									placeholder="Confirm your password..."
									placeholderTextColor={'white'}
									onChangeText={(e) => {
										setConfirmPassword(e);
									}}
									value={confirmPassword}
									secureTextEntry={true}
								></TextInput>
							</View>

							<TouchableOpacity style={styles.btn} onPress={handleSignUp}>
								<Text style={styles.btnText}>Create your account</Text>
							</TouchableOpacity>
							<Text style={styles.swapLabel}>
								Already have an account?{' '}
								<Link style={{ color: 'white', textDecorationLine: 'underline', fontFamily: 'SourceBold' }} href="/login">
									Sign in
								</Link>
							</Text>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		</>
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
