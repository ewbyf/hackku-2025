import Phase1 from '@/components/tutorial/Phase1';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

export interface TutorialPhaseProps {
	next: () => void;
}

const phases: React.FC<TutorialPhaseProps>[] = [Phase1];

export default function Tutorial() {
	const [phase, setPhase] = useState<number>(0);

	const Phase = useMemo(() => phases[phase], [phase]);

	return <Phase next={() => console.log('next')} />;
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
		fontSize: 20
	},
	titleContainer: {
		backgroundColor: '#544FB1',
		padding: 6,
		paddingHorizontal: 14,
		borderRadius: 5,
		marginTop: 15,
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8
	}
});

