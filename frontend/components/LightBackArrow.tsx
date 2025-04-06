import { useRouter } from 'expo-router';
import { login } from '../lib/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const LightBackArrow = () => {
    const router = useRouter();

    const goBack = () => {
        if (router.canGoBack()) {
            router.back();
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={goBack}>
            <Icon name="chevron-back-outline" color={'#6C63FF'} size={25}></Icon>
            <Text style={styles.title}>Go back</Text>
        </TouchableOpacity>
    );
};

export default LightBackArrow;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 68,
        left: 20,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        padding: 8,
        borderRadius: 10,
        zIndex: 99,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        color: '#6C63FF',
        fontFamily: 'SourceBold',
        marginRight: 10,
    }
});
