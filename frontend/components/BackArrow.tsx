import { useRouter } from 'expo-router';
import { login } from '../lib/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const BackArrow = () => {
	const router = useRouter();

	const goBack = () => {
		if (router.canGoBack()) {
			router.back();
		}
	};

	return (
		<TouchableOpacity style={styles.container} onPress={goBack}>
			<Icon name="chevron-back-outline" color={'white'} size={25}></Icon>
            <Text style={styles.title}>Go back</Text>
		</TouchableOpacity>
	);
};

export default BackArrow;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 75,
		left: 25,
		backgroundColor: '#6C63FF',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
        padding: 8,
        borderRadius: 10,
        zIndex: 99,
        flexDirection: 'row',
        alignItems: 'center'
	},
    title: {
        fontSize: 22,
        color: 'white',
        fontFamily: 'SourceBold',
        marginRight: 10,
    }
});
