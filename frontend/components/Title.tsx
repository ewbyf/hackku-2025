import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from 'react-native-vector-icons/Ionicons';

const Title = ({ noUnderline, children }: {noUnderline ?: boolean, children: string}) => {
    return (
        <View style={{marginBottom: !noUnderline ? 20 : 0}}>
            <Text style={styles.txt}>{children}</Text>
          {!noUnderline &&  <View style={styles.bar}></View>}
        </View>
    );
}
 
export default Title;

const styles = StyleSheet.create({
    txt: {
        fontFamily: 'SourceBold',
        fontSize: 42,
        color: '#6C63FF',
    },
    bar: {
        height: 6,
        width: 80,
        backgroundColor: '#6C63FF'
    }
});
