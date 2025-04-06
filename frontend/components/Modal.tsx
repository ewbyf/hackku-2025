import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ModalProps {
	open: boolean;
	phases: React.ReactNode[];
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, phases, onClose }) => {
	const [phase, setPhase] = useState<number>(0);

	return (
		open && (
			<View style={styles.backdrop}>
				<View style={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<View style={styles.body}>
						<TouchableOpacity style={styles.btn} onPress={onClose}>
							<Text style={styles.btnText}>Skip</Text>
						</TouchableOpacity>
						{phases[phase]}
						<View style={styles.controls}>
							{phase === 0 ? (
								<View />
							) : (
								<TouchableWithoutFeedback onPress={() => setPhase((phase) => phase - 1)}>
									<Icon name="chevron-left" />
								</TouchableWithoutFeedback>
							)}
							{phase === phases.length - 1 ? (
								<View />
							) : (
								<TouchableWithoutFeedback onPress={() => setPhase((phase) => phase + 1)}>
									<Icon name="chevron-right" />
								</TouchableWithoutFeedback>
							)}
						</View>
					</View>
				</View>
			</View>
		)
	);
};

export default Modal;

const styles = StyleSheet.create({
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		backdropFilter: 'blur',
		height: '100%',
		width: '100%'
	},
	controls: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		width: '100%',
		top: '50%',
		left: 0,
		transform: 'translateY(-50%)'
	},
	body: {
		height: '80%',
		width: '90%',
		backgroundColor: 'white',
		borderRadius: 12
	},
	btn: {
		backgroundColor: '#6C63FF',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		justifyContent: 'center',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25
	},
	btnText: {
		color: 'white',
		fontFamily: 'SourceSemibold',
		fontSize: 20
	}
});

