import { View, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import DiagnosisCard from './DiagnosticCard';

interface TimelineItem {
  name: string;
  doctor: string;
  date: string;
  progress: string;
}

const diagnosisData: TimelineItem[] = [
  {
    name: 'Diagnosis 1',
    doctor: 'Dr. Bryant',
    date: '04/01/2025',
    progress: 'In Progress',
  },
  {
    name: 'Diagnosis 2',
    doctor: 'Dr. Kim',
    date: '04/03/2025',
    progress: 'Resolved',
  },
];

const DiagnosisTimeline = () => {
  return (
    <View style={styles.container}>
      <Timeline
        data={diagnosisData}
        showTime={false}
        circleSize={14}
        circleColor="#9D8FFF"
        lineColor="#E1DAFF"
        innerCircle="dot"
        renderDetail={(rowData: TimelineItem) => (
          <DiagnosisCard
            name={rowData.name}
            doctor={rowData.doctor}
            date={rowData.date}
            progress={rowData.progress}
          />
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
  },
});
