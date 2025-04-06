import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
	short: React.ReactNode;
	opened: boolean;
	onOpened: () => void;
	onClosed: () => void;
}

const AccordionItem: React.FC<React.PropsWithChildren<Props>> = ({ short, opened, onOpened, onClosed, children }) => {
	return (
		<View style={[styles.container, ]}>
			<TouchableOpacity onPress={opened ? onClosed : onOpened}>
				<View style={[styles.box, {borderRadius: !opened ? 10 : 0}]}>
					<View>{short}</View>
					<Icon name={opened ? 'chevron-up' : 'chevron-down'} color="white" size={30} />
				</View>
			</TouchableOpacity>
			{opened && <View style={styles.details}>{children}</View>}
		</View>
	);
};

export default AccordionItem;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 0,
		color: 'white',
        borderRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		backgroundColor: 'white'
	},
	box: {
		display: 'flex',
		alignContent: 'center',
		flexDirection: 'row',
        alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: '#6C63FF',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	icon: {
		height: 30
	},
	details: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	}
});

