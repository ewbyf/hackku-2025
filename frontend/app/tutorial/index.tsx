import Title from '@/components/Title';
import TopBar from '@/components/TopBar';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Tutorial() {
	return (
		<ImageBackground source={require('../../assets/images/bg.png')} imageStyle={{ resizeMode: 'cover' }} style={{ height: '100%', width: '100%' }}>
			<SafeAreaView style={styles.container}>
				<TopBar />
				<Text>{hasEvent}</Text>
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
					<Title>Today's Meds</Title>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1
	},
	blurContainer: {
		padding: 20,
		borderRadius: 10,
		overflow: 'hidden'
	},
	sectionTitle: {
		color: 'white',
		fontFamily: 'SourceSemibold',
		fontSize: 32,
		backgroundColor: '#6C63FF',
		padding: 10,
		paddingHorizontal: 20,
		borderRadius: 15
	}
});

