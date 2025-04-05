import { Tabs } from 'expo-router';

export default function HomeLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="map" options={{ title: 'Map' }} />
      <Tabs.Screen name="documents" options={{ title: 'Documents' }} />
    </Tabs>
  );
}
