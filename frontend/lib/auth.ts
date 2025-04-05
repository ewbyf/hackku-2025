import * as SecureStore from 'expo-secure-store';

export async function isLoggedIn(): Promise<boolean> {
  const token = await SecureStore.getItemAsync('userToken');
  return !!token;
}

export async function login(token: string) {
  await SecureStore.setItemAsync('userToken', token);
}

export async function logout() {
  await SecureStore.deleteItemAsync('userToken');
}
