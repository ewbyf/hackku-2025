import { View, StyleSheet, Text } from 'react-native';

const PriorityCard2 = () => {
    return (
        <View style={styles.priorityCard}>
            <Text style={styles.priorityTitle}>IMPORTANT</Text>
            <Text style={styles.priorityTxt}>You have a trip in <Text style={{fontFamily: "SourceBold"}}>2 days</Text>. Remember to refill your prescriptions if necessary.</Text>
        </View>
    );
};

export default PriorityCard2;

const styles = StyleSheet.create({
    priorityCard: {
        gap: 5,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.25,
        shadowColor: '#6C63FF',
        width: 350,
    },
    priorityTitle: {
        fontFamily: 'SourceBold',
        fontSize: 22,
    },
    priorityTxt: {
        fontFamily: 'Source',
        fontSize: 18,
    }
});
