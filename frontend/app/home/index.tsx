import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Welcome Home!</Text>
      <Button title="Go to drug info Page" onPress={() => router.push('/drug')} />
    </View>
  );
}
