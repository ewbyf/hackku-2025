import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from 'react-native-vector-icons/Ionicons';

const TopBar = () => {
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row' }}>
				<Text>LOGO</Text>
				<Text>ClearHelp</Text>
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
	},
    btn: {
        backgroundColor: 'red',
        paddingHorizontal: 35,
        paddingVertical: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    btnText: {
        fontFamily: "SourceBold",
        fontSize: 18,
        color: 'white'
    }
});
