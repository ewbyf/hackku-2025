import { Link, useRouter } from 'expo-router';
import { login } from '../lib/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import { useState } from 'react';
import BackArrow from '@/components/BackArrow';

export default function Login() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		
		router.replace('/home');
	};

	return (
		<SafeAreaView style={styles.container}>
			<BackArrow />
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, padding: 30 }}>
				<View style={{ gap: 50, justifyContent: 'flex-end', height: '100%' }}>
					<Text style={styles.title}>Let's create an account</Text>
					<View style={{ gap: 20 }}>
						<View style={{ gap: 5 }}>
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
						</View>
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
							></TextInput>
                            <Text style={styles.swapLabel}>Already have an account? <Link style={{color: 'white', textDecorationLine: 'underline', fontFamily: 'SourceBold'}} href="/login">Sign in</Link></Text>
						</View>
						<TouchableOpacity style={styles.btn} onPress={handleLogin}>
							<Text style={styles.btnText}>Sign in</Text>
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
        alignSelf: 'flex-end',
        marginTop: 2
    }
});
