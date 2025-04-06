import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ModalProps {
	open: boolean;
	phases: React.ReactNode[];
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, phases, onClose }) => {
	const [phase, setPhase] = useState<number>(0);
	const router = useRouter();

	return (
		open && (
			<View style={styles.backdrop}>
				<View style={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<SafeAreaView style={styles.body}>
						{phases[phase]}
						<View style={{ position: 'absolute', flexDirection: 'row', gap: 10, left: '50%', transform: [{ translateX: -50 }], bottom: 125 }}>
							<View style={[styles.progressBar, { backgroundColor: phase == 0 ? 'white' : '#B5B1FF' }]}></View>
							<View style={[styles.progressBar, { backgroundColor: phase == 1 ? 'white' : '#B5B1FF' }]}></View>
							<View style={[styles.progressBar, { backgroundColor: phase == 2 ? 'white' : '#B5B1FF' }]}></View>
						</View>
						<View style={styles.controls}>
							{phase === 0 ? (
								<View />
							) : (
								<TouchableOpacity onPress={() => setPhase((phase) => phase - 1)} style={styles.btn}>
									<Icon name="chevron-back-outline" size={22} color="#6C63FF" style={{ marginLeft: -10 }} />
									<Text style={styles.btnText}>BACK</Text>
								</TouchableOpacity>
							)}
							{phase === phases.length - 1 ? (
								<TouchableOpacity onPress={() => router.replace('/home')} style={styles.btn}>
									<Text style={styles.btnText}>FINISH</Text>
									<Icon name="chevron-forward-outline" size={22} color="#6C63FF" style={{ marginRight: -10 }} />
								</TouchableOpacity>
							) : (
								<TouchableOpacity onPress={() => setPhase((phase) => phase + 1)} style={styles.btn}>
									<Text style={styles.btnText}>NEXT</Text>
									<Icon name="chevron-forward-outline" size={22} color="#6C63FF" style={{ marginRight: -10 }} />
								</TouchableOpacity>
							)}
						</View>
					</SafeAreaView>
				</View>
			</View>
		)
	);
};

export default Modal;

const styles = StyleSheet.create({
	progressBar: {
		height: 5,
		width: 25,
        borderRadius: 10,
		backgroundColor: '#B5B1FF',
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		backdropFilter: 'blur',
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		zIndex: 99,
	},
	controls: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		width: '100%',
		bottom: '0%',
		paddingHorizontal: 20,
		left: 0,
		transform: 'translateY(-50%)',
	},
	body: {
		height: '100%',
		width: '100%',
		backgroundColor: '#6C63FF',
		borderRadius: 12,
	},
	btn: {
		backgroundColor: 'white',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		justifyContent: 'center',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
	},
	btnText: {
		color: '#6C63FF',
		fontFamily: 'SourceSemibold',
		fontSize: 22,
	},
});
