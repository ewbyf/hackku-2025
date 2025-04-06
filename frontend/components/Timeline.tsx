import { View, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import DiagnosisCard from './DiagnosticCard';
import Title from './Title';

interface TimelineItem {
	name: string;
	doctor: string;
	date: string;
	progress: string;
	circleColor?: string;
	lineColor?: string;
	icon?: string;
}

const diagnosisData: TimelineItem[] = [
	{
		name: 'Diagnosis 2',
		doctor: 'Dr. Kim',
		date: '04/03/2025',
		progress: 'In Progress',
		circleColor: '#6C63FF',
	},
	{
		name: 'Diagnosis 1',
		doctor: 'Dr. Bryant',
		date: '04/01/2025',
		progress: 'Resolved',
	},
];

const DiagnosisTimeline = () => {
	return (
		<View style={styles.container}>
			<View style={{ paddingLeft: 20 }}>
				<Title>Your Journey</Title>
			</View>
			<Timeline
				data={diagnosisData}
				showTime={false}
				circleSize={14}
				circleColor="#8F88FF"
				lineColor="#8F88FF"
				renderDetail={(rowData: TimelineItem) => (
					<DiagnosisCard name={rowData.name} doctor={rowData.doctor} date={rowData.date} progress={rowData.progress} />
				)}
			/>
		</View>
	);
};

export default DiagnosisTimeline;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingLeft: 0,
	},
});
