import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from 'react-native-vector-icons/Ionicons';
import LogoSVG from './svgs/Logo';
import { logout } from '@/lib/auth';
import { useRouter } from 'expo-router';

const TopBar = ({ logo }: { logo?: boolean }) => {
    const router = useRouter();
	const leave = async () => {
		await logout();
        router.replace('/')
	};

	return (
		<View style={styles.container}>
			{!logo && (
				<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
					<LogoSVG />
					<Text style={styles.logoText}>medIQ</Text>
				</View>
			)}
			<TouchableOpacity style={styles.btn} onPress={leave}>
				<Logo name="call" color="white" size={18} />
				<Text style={styles.btnText}>EMERGENCY</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TopBar;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 20,
        height: 150,
        marginTop: -80,
        backgroundColor: '#6C63FF'
	},
	btn: {
		backgroundColor: '#FF5A5A',
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		marginLeft: 'auto',
	},
	btnText: {
		fontFamily: 'SourceBold',
		fontSize: 17,
		color: 'white',
	},
	logoText: {
		fontFamily: 'SourceBold',
		fontSize: 28,
		color: 'white',
		letterSpacing: 0.2,
	},
});
