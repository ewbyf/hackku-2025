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
	prerequisites?: string[];
}

const diagnosisData: TimelineItem[] = [
	{
		name: 'Post-Surgery Blood Test',
		doctor: 'Lab Technician',
		date: '04/12/2025',
		progress: 'Scheduled',
		prerequisites: ['Surgical Procedure: Appendectomy'],
		circleColor: '#6C63FF',
		lineColor: '#6C63FF',
	},
	{
		name: 'Follow-up Appointment',
		doctor: 'Dr. Kim',
		date: '04/10/2025',
		progress: 'Scheduled',
		prerequisites: ['Surgical Procedure: Appendectomy'],
		circleColor: '#6C63FF',
		lineColor: '#6C63FF',
	},
	{
		name: 'Surgical Procedure: Appendectomy',
		doctor: 'Dr. Kim',
		date: '04/05/2025',
		progress: 'Completed',
		prerequisites: ['Appointment with Dr. Kim'],
	},
	{
		name: "Doctor's Appointment",
		doctor: 'Dr. Kim',
		date: '03/30/2025',
		progress: 'Completed',
		prerequisites: ['Blood Test - Liver Function'],
	},
	{
		name: 'Blood Test - Liver Function',
		doctor: 'Lab Technician',
		date: '03/27/2025',
		progress: 'Completed',
		prerequisites: ['CT Scan (Abdomen)'],
	},
	{
		name: 'CT Scan (Abdomen)',
		doctor: 'Dr. Kim',
		date: '03/25/2025',
		progress: 'Completed',
	},
	{
		name: "Doctor's Appointment",
		doctor: 'Dr. Bryant',
		date: '03/22/2025',
		progress: 'Completed',
		prerequisites: ['Blood Test - CBC'],
	},
	{
		name: 'Blood Test - CBC',
		doctor: 'Lab Technician',
		date: '03/20/2025',
		progress: 'Completed',
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
		paddingVertical: 20,
	},
});
