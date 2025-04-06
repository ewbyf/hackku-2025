import { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

interface Props {
	description: string;
}

const FocusedElement: React.FC<React.PropsWithChildren<Props>> = ({ description, children }) => {
	const { height, width } = useWindowDimensions();
	const [dims, setDims] = useState<{ top: number; left: number } | null>(null);

	return (
		<>
			<View
				style={{
					width,
					height,
					position: 'absolute',
					...(dims ?? {}),
					zIndex: 1,
					backgroundColor: 'rgba(0, 0, 0, 0.6)'
				}}
				ref={
					dims === null
						? (view) => {
								if (view) {
									view.measureInWindow((x, y) => setDims({ top: -y, left: -x }));
								}
						  }
						: null
				}
			/>
			<View style={{ position: 'relative', zIndex: 2 }}>{children}</View>
			<View style={styles.tooltip}>
				<View style={styles.caret} />
				<Text style={styles.description}>{description}</Text>
			</View>
		</>
	);
};

export default FocusedElement;

const styles = StyleSheet.create({
	tooltip: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'relative',
		zIndex: 2
	},
	description: {
		borderRadius: 8,
		backgroundColor: 'white',
		textAlign: 'center',
		paddingVertical: 8,
		paddingHorizontal: 16
	},
	caret: {
		position: 'absolute',
		left: '50%',
		top: -2 * Math.sqrt(2),
		height: 4,
		width: 4,
		transform: 'rotate(45deg)'
	}
});

