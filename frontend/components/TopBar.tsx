import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from 'react-native-vector-icons/Ionicons';
import LogoSVG from './svgs/Logo';

const TopBar = () => {
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
				<LogoSVG/>
				<Text style={styles.logoText}>ClearHelp</Text>
			</View>
			<TouchableOpacity style={styles.btn}>
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
		alignItems: 'center',
		justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
	},
    btn: {
        backgroundColor: '#FF4545',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
    },
    btnText: {
        fontFamily: "SourceBold",
        fontSize: 18,
        color: 'white'
    },
	logoText: {
        fontFamily: "SourceBold",
        fontSize: 26,
        color: '#6C63FF',
		letterSpacing: 0.2,
	},
});
