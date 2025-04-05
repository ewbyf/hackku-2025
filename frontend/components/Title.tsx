import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from 'react-native-vector-icons/Ionicons';

const Title = ({ children }: {children: string}) => {
    return (
        <View>
            <Text style={styles.txt}>{children}</Text>
            <View style={styles.bar}></View>
        </View>
    );
}
 
export default Title;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    txt: {
        fontFamily: 'SourceBold',
        fontSize: 36,
        color: '#6C63FF'
    },
    bar: {
        height: 6,
        width: 55,
        backgroundColor: '#6C63FF'
    }
});
