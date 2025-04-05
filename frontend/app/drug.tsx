import { Stack, useRouter } from 'expo-router';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

export default function ExtraScreen() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: true, title: 'Details', presentation: 'modal' }} />
      <View>
        <Text>This page has no tab bar</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },
});